import { BaseError } from "@little-nebulae/error";

export class UsedRequestBodyError extends BaseError<
  "USED_REQUEST_BODY_ERROR",
  TypeError
> {
  readonly name = "UsedRequestBodyError";
  readonly code = "USED_REQUEST_BODY_ERROR";

  constructor({ message, cause }: { message?: string; cause: TypeError }) {
    super({ message: message ?? cause.message, cause, meta: null });
  }
}
