import type { HttpRequestMethod } from "@little-nebulae/http";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { fail, succeed } from "@little-nebulae/result";

export function createRequest({
  url,
  method,
  headers,
  body,
}: {
  url: string | URL;
  method?: HttpRequestMethod;
  headers?: Headers;
  body?: string;
}) {
  try {
    // oxlint-disable-next-line unicorn/no-invalid-fetch-options
    const request = new Request(url, { method, headers, body });
    return succeed(request);
  } catch (error) {
    return fail(
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "create web request",
          reason: "some unexpected error",
        }),
        cause: error,
        meta: null,
      }),
    );
  }
}
