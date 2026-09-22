import type { Result } from "@little-nebulae/result";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { fail, succeed } from "@little-nebulae/result";

export async function fetchResponse({
  request,
}: {
  request: Request;
}): Promise<Result<Response, UnexpectedError>> {
  try {
    const response = await fetch(request);
    return succeed(response);
  } catch (error) {
    return fail(
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "fetch response",
          reason: "some unexpected error",
        }),
        cause: error,
        meta: null,
      }),
    );
  }
}
