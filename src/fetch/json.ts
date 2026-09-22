import type { UnexpectedError } from "@little-nebulae/error";
import type { InvalidJsonStringError } from "@little-nebulae/json";
import type { Result } from "@little-nebulae/result";
import type { JSONType } from "zod";

import { fetchResponse } from "@/fetch/response";
import { parseJsonResponseBody } from "@/response/parse-json-body";

export async function fetchJson({
  request,
}: {
  request: Request;
}): Promise<Result<JSONType, InvalidJsonStringError | UnexpectedError>> {
  const fetchResponseResult = await fetchResponse({ request });
  if (!fetchResponseResult.success) {
    return fetchResponseResult;
  }
  const response = fetchResponseResult.data;

  return await parseJsonResponseBody({ response });
}
