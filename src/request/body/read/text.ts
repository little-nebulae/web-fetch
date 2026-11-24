import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { HTTP_HEADER_ENUM } from "@little-nebulae/http";
import { produceAsyncResult } from "@little-nebulae/result";

import { WebBodyDecodingError } from "@/errors/body-decoding";
import { WebUsedBodyError } from "@/errors/used-body";

export async function webReadTextRequestBody({
  request,
}: {
  request: Request;
}) {
  return produceAsyncResult({
    tryFn: () => request.text(),
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
          operation: "read text request body",
        }),
        cause: error,
        meta: null,
      });
    },
  });
}
