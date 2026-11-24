import type { AsyncResult } from "@little-nebulae/result";

import { UnexpectedError, composeErrorMessage } from "@little-nebulae/error";
import { JsonParseError, jsonParse } from "@little-nebulae/json";
import { createFailure } from "@little-nebulae/result";

import type { WebBodyDecodingError } from "@/errors/body-decoding";
import type { WebUsedBodyError } from "@/errors/used-body";

import { webReadTextRequestBody } from "@/request/body/read/text";

export async function webParseJsonRequestBody<T = unknown>({
  request,
}: {
  request: Request;
}): AsyncResult<
  T,
  | WebUsedBodyError
  | WebBodyDecodingError
  | JsonParseError<{ text: string }>
  | UnexpectedError<unknown, null | { text: string }>
> {
  const readTextResult = await webReadTextRequestBody({ request });
  if (!readTextResult.success) {
    return readTextResult;
  }
  const text = readTextResult.data;

  const jsonParseResult = jsonParse<T>({ text });
  if (jsonParseResult.success) {
    return jsonParseResult;
  }
  const operation = "parse JSON request body";
  const jsonParseError = jsonParseResult.error;
  if (jsonParseError.code === "JSON_PARSE_ERROR") {
    return createFailure(
      new JsonParseError({
        message: composeErrorMessage({
          operation,
          reason: "the text being invalid JSON",
        }),
        cause: jsonParseError.cause,
        meta: { text },
      }),
    );
  }
  return createFailure(
    new UnexpectedError({
      message: composeErrorMessage({ operation }),
      cause: jsonParseError.cause,
      meta: { text },
    }),
  );
}
