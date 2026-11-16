import type { Result } from "@little-nebulae/result";
import type { ZodParseError } from "@little-nebulae/zod";
import type { JSONType } from "zod";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { HTTP_RESPONSE_STATUS_ENUM } from "@little-nebulae/http";
import { fail, succeed } from "@little-nebulae/result";
import { wrapZodResult } from "@little-nebulae/zod";
import { z } from "zod";

import type { CreateJsonResponseParams } from "@/response/create/types";

export function webCreateJsonResponse({
  inputs,
}: CreateJsonResponseParams): Result<
  Response,
  ZodParseError<JSONType> | UnexpectedError
> {
  const jsonParseResult = wrapZodResult(z.json().safeParse(inputs.data));

  if (!jsonParseResult.success) {
    return jsonParseResult;
  }

  try {
    const response = Response.json(jsonParseResult.data, {
      status: HTTP_RESPONSE_STATUS_ENUM[inputs.status].CODE,
      statusText: HTTP_RESPONSE_STATUS_ENUM[inputs.status].TEXT,
      headers: inputs.headers ?? new Headers(),
    });
    return succeed(response);
  } catch (error) {
    return fail(
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "create a lossless json web response",
        }),
        cause: error,
        meta: null,
      }),
    );
  }
}
