import type { UnexpectedError } from "@little-nebulae/error";
import type { AsyncResult } from "@little-nebulae/result";

import { composeErrorMessage } from "@little-nebulae/error";
import { JsonParseError, jsonParse } from "@little-nebulae/json";
import { fail } from "@little-nebulae/result";

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
  | UnexpectedError
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
  return fail(
    new JsonParseError({
      message: composeErrorMessage({
        operation: "parse request body text",
        reason: "the text being invalid JSON",
      }),
      cause: jsonParseResult.error.cause,
      meta: { text },
    }),
  );
}
