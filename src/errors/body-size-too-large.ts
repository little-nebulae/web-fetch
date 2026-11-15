import { BaseError } from "@little-nebulae/error";

export class WebBodySizeTooLargeError extends BaseError<
  "WEB_BODY_SIZE_TOO_LARGE_ERROR",
  RangeError
> {
  readonly name = "WebBodySizeTooLargeError";
  readonly code = "WEB_BODY_SIZE_TOO_LARGE_ERROR";

  constructor({ message, cause }: { message?: string; cause: RangeError }) {
    super({
      message: message ?? cause.message,
      cause,
      meta: null,
    });
  }
}
