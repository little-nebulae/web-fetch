import type { Result } from "@little-nebulae/result";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { fail, succeed } from "@little-nebulae/result";

export async function parseTextResponseBody({
  response,
}: {
  response: Response;
}): Promise<Result<string, UnexpectedError>> {
  try {
    const text = await response.text();
    return succeed(text);
  } catch (error) {
    return fail(
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "parse text response body",
          reason: "some unexpected error",
        }),
        cause: error,
        meta: null,
      }),
    );
  }
}
