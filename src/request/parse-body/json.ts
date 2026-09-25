import type { UnexpectedError } from "@little-nebulae/error";
import type { InvalidJsonStringError } from "@little-nebulae/json";
import type { Result } from "@little-nebulae/result";
import type { JSONType } from "zod";

import { parseJsonString } from "@little-nebulae/json";

import { parseTextRequestBody } from "@/request/parse-body/text";

export async function parseJsonRequestBody({
  request,
}: {
  request: Request;
}): Promise<Result<JSONType, InvalidJsonStringError | UnexpectedError>> {
  const parseTextResult = await parseTextRequestBody({ request });
  if (!parseTextResult.success) {
    return parseTextResult;
  }
  const text = parseTextResult.data;

  return parseJsonString(text);
}
