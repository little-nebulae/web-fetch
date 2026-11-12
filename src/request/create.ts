import type { HttpRequestMethod } from "@little-nebulae/http";
import type { Result } from "@little-nebulae/result";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { attempt } from "@little-nebulae/result";

export function createRequest({
  url,
  ...init
}: {
  url: string | URL;
  method?: HttpRequestMethod;
  headers?: Headers;
  body?: string;
}): Result<Request, UnexpectedError> {
  return attempt({
    tryFn: () => new Request(url, init),
    catchFn: (error) =>
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "create a web request",
        }),
        cause: error,
        meta: null,
      }),
  });
}
