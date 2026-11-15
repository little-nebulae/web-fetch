import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { HTTP_RESPONSE_STATUS_ENUM } from "@little-nebulae/http";
import { attempt } from "@little-nebulae/result";

import type { BodyInit, HeadersInit } from "@/types";

export function webCreateResponse({
  body,
  status = "OK",
  headers = new Headers(),
}: {
  body?: BodyInit;
  status?: keyof typeof HTTP_RESPONSE_STATUS_ENUM;
  headers?: HeadersInit;
}) {
  return attempt({
    tryFn: () =>
      new Response(body, {
        status: HTTP_RESPONSE_STATUS_ENUM[status].CODE,
        statusText: HTTP_RESPONSE_STATUS_ENUM[status].TEXT,
        headers,
      }),
    catchFn: (error) =>
      new UnexpectedError({
        message: composeErrorMessage({ operation: "create a web response" }),
        cause: error,
        meta: null,
      }),
  });
}
