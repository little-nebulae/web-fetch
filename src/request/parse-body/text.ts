import type { Result } from "@little-nebulae/result";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { fail, succeed } from "@little-nebulae/result";

export async function parseTextRequestBody({
  request,
}: {
  request: Request;
}): Promise<Result<string, UnexpectedError>> {
  try {
    const text = await request.text();
    return succeed(text);
  } catch (error) {
    return fail(
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "parse text request body",
          reason: "some unexpected error",
        }),
        cause: error,
        meta: null,
      }),
    );
  }
}
