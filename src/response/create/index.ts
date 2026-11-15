import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { attempt } from "@little-nebulae/result";

import type { BodyInit, HeadersInit } from "@/types";

export function webCreateResponse({
  body,
  headers = new Headers(),
}: {
  body?: BodyInit;
  headers?: HeadersInit;
}) {
  return attempt({
    tryFn: () => new Response(body, { headers }),
    catchFn: (error) =>
      new UnexpectedError({
        message: composeErrorMessage({ operation: "create a web response" }),
        cause: error,
        meta: null,
      }),
  });
}
