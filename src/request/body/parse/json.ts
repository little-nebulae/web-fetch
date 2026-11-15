import type { UnexpectedError } from "@little-nebulae/error";
import type { JsonParseError } from "@little-nebulae/json";
import type { AsyncResult } from "@little-nebulae/result";

import { jsonParse } from "@little-nebulae/json";

import type { WebBodyDecodingError } from "@/errors/body-decoding";
import type { WebUsedBodyError } from "@/errors/used-body";

import { webReadTextRequestBody } from "@/request/body/read/text";

export async function webParseJsonRequestBody<T = unknown>({
  request,
}: {
  request: Request;
}): AsyncResult<
  T,
  WebUsedBodyError | WebBodyDecodingError | JsonParseError | UnexpectedError
> {
  const readTextResult = await webReadTextRequestBody({ request });
  if (!readTextResult.success) {
    return readTextResult;
  }
  const text = readTextResult.data;

  return jsonParse<T>(text);
}
