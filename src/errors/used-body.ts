import { BaseError } from "@little-nebulae/error";

export class WebUsedBodyError extends BaseError<
  "WEB_USED_BODY_ERROR",
  TypeError
> {
  readonly name = "WebUsedBodyError";
  readonly code = "WEB_USED_BODY_ERROR";

  constructor({ message, cause }: { message?: string; cause: TypeError }) {
    super({ message: message ?? cause.message, cause, meta: null });
  }
}
