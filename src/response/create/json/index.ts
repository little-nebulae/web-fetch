import type { Result } from "@little-nebulae/result";
import type { $ZodIssue } from "zod/v4/core";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { HTTP_RESPONSE_STATUS_ENUM } from "@little-nebulae/http";
import { JsonStringifyError } from "@little-nebulae/json";
import { attempt } from "@little-nebulae/result";
import { z } from "zod";

import type { CreateJsonResponseParams } from "@/response/create/types";

export function webCreateJsonResponse({
  inputs,
}: CreateJsonResponseParams): Result<
  {
    response: Response;
    meta:
      | {
          lossless: true;
        }
      | {
          lossless: false;
          issues: $ZodIssue[];
        };
  },
  JsonStringifyError<{ issues: $ZodIssue[] }> | UnexpectedError
> {
  const jsonParseResult = z.json().safeParse(inputs.data);

  return attempt({
    tryFn: () => {
      const response = Response.json(inputs.data, {
        status: HTTP_RESPONSE_STATUS_ENUM[inputs.status].CODE,
        statusText: HTTP_RESPONSE_STATUS_ENUM[inputs.status].TEXT,
        headers: inputs.headers ?? new Headers(),
      });

      return {
        response,
        meta: jsonParseResult.success
          ? { lossless: true }
          : { lossless: false, issues: jsonParseResult.error.issues },
      };
    },
    catchFn: (error) => {
      const operation = "create a json web response";
      if (error instanceof TypeError && !jsonParseResult.success) {
        return new JsonStringifyError({
          message: composeErrorMessage({
            operation,
            reason: "input data being invalid JSON",
          }),
          cause: error,
          meta: { issues: jsonParseResult.error.issues },
        });
      }
      return new UnexpectedError({
        message: composeErrorMessage({ operation }),
        cause: error,
        meta: null,
      });
    },
  });
}
