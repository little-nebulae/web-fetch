import { BaseError } from "@little-nebulae/error";

export class RequestBodyDecodingError extends BaseError<
  "REQUEST_BODY_DECODING_ERROR",
  TypeError,
  { contentEncoding: string | null }
> {
  readonly name = "RequestBodyDecodingError";
  readonly code = "REQUEST_BODY_DECODING_ERROR";

  constructor({
    message,
    cause,
    contentEncoding,
  }: {
    message?: string;
    cause: TypeError;
    contentEncoding: string | null;
  }) {
    super({
      message: message ?? cause.message,
      cause,
      meta: { contentEncoding },
    });
  }
}
