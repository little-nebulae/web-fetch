import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { HTTP_HEADER_ENUM } from "@little-nebulae/http";
import { attemptAsync } from "@little-nebulae/result";

import { WebBodyDecodingError } from "@/errors/body-decoding";
import { WebBodySizeTooLargeError } from "@/errors/body-size-too-large";
import { WebUsedBodyError } from "@/errors/used-body";

export async function webReadBytesRequestBody({
  request,
}: {
  request: Request;
}) {
  return attemptAsync({
    tryFn: () => request.bytes(),
    catchFn: (error) => {
      if (error instanceof TypeError) {
        if (request.bodyUsed) {
          return new WebUsedBodyError({ cause: error });
        }
        return new WebBodyDecodingError({
          cause: error,
          contentEncoding: request.headers.get(
            HTTP_HEADER_ENUM.CONTENT_ENCODING,
          ),
        });
      }
      if (error instanceof RangeError) {
        return new WebBodySizeTooLargeError({ cause: error });
      }
      return new UnexpectedError({
        message: composeErrorMessage({
          operation: "read bytes request body",
        }),
        cause: error,
        meta: null,
      });
    },
  });
}
