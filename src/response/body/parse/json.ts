import type { UnexpectedError } from "@little-nebulae/error";
import type { JsonParseError } from "@little-nebulae/json";
import type { AsyncResult } from "@little-nebulae/result";

import { jsonParse } from "@little-nebulae/json";

import type { WebBodyDecodingError } from "@/errors/body-decoding";
import type { WebUsedBodyError } from "@/errors/used-body";

import { webReadTextResponseBody } from "@/response/body/read/text";

export async function webParseJsonResponseBody<T = unknown>({
  response,
}: {
  response: Response;
}): AsyncResult<
  T,
  WebUsedBodyError | WebBodyDecodingError | JsonParseError | UnexpectedError
> {
  const readTextResult = await webReadTextResponseBody({ response });
  if (!readTextResult.success) {
    return readTextResult;
  }
  const text = readTextResult.data;

  return jsonParse<T>(text);
}
