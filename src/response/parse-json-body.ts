import type { UnexpectedError } from "@little-nebulae/error";
import type { InvalidJsonStringError } from "@little-nebulae/json";
import type { Result } from "@little-nebulae/result";
import type { JSONType } from "zod";

import { parseJsonString } from "@little-nebulae/json";

import { parseTextResponseBody } from "@/response/parse-text-body";

export async function parseJsonResponseBody({
  response,
}: {
  response: Response;
}): Promise<Result<JSONType, InvalidJsonStringError | UnexpectedError>> {
  const parseTextResult = await parseTextResponseBody({ response });
  if (!parseTextResult.success) {
    return parseTextResult;
  }
  const text = parseTextResult.data;

  return parseJsonString(text);
}
