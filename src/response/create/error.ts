import type { Except, JsonValue } from "type-fest";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { HTTP_ERROR_RESPONSE_STATUS_ENUM } from "@little-nebulae/http";
import { attempt } from "@little-nebulae/result";

import type { HeaderRecord } from "@/types";

export function webCreateErrorResponse({
  code,
  message,
  meta,
  status,
  headers,
}: {
  code: string;
  message: string;
  meta: JsonValue;
  status: keyof typeof HTTP_ERROR_RESPONSE_STATUS_ENUM;
  headers?: Except<HeaderRecord, "content-type">;
}) {
  return attempt({
    tryFn: () =>
      Response.json(
        { code, message, meta },
        {
          status: HTTP_ERROR_RESPONSE_STATUS_ENUM[status].CODE,
          statusText: HTTP_ERROR_RESPONSE_STATUS_ENUM[status].TEXT,
          headers: headers ?? new Headers(),
        },
      ),
    catchFn: (error) =>
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "create a web error response",
        }),
        cause: error,
        meta: null,
      }),
  });
}
