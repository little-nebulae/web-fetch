import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { HTTP_HEADER_ENUM } from "@little-nebulae/http";
import { attemptAsync } from "@little-nebulae/result";

import { WebBodyDecodingError } from "@/errors/body-decoding";
import { WebUsedBodyError } from "@/errors/used-body";

export async function webReadArrayBufferRequestBody({
  request,
}: {
  request: Request;
}) {
  return attemptAsync({
    tryFn: () => request.arrayBuffer(),
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
      return new UnexpectedError({
        message: composeErrorMessage({
          operation: "read array buffer request body",
        }),
        cause: error,
        meta: null,
      });
    },
  });
}
