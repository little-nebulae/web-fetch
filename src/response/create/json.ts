import type { JsonValue } from "type-fest";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { HTTP_RESPONSE_STATUS_ENUM } from "@little-nebulae/http";
import { attempt } from "@little-nebulae/result";

import type { HeadersInit } from "@/types";

export function webCreateJsonResponse<T extends JsonValue>({
  data,
  status = "OK",
  headers = new Headers(),
}: {
  data: T;
  status?: keyof typeof HTTP_RESPONSE_STATUS_ENUM;
  headers?: HeadersInit;
}) {
  return attempt({
    tryFn: () =>
      Response.json(data, {
        status: HTTP_RESPONSE_STATUS_ENUM[status].CODE,
        statusText: HTTP_RESPONSE_STATUS_ENUM[status].TEXT,
        headers,
      }),
    catchFn: (error) =>
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "create a json web response",
        }),
        cause: error,
        meta: null,
      }),
  });
}
