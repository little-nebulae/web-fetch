import type {
  HTTP_ERROR_RESPONSE_STATUS_ENUM,
  HTTP_SUCCESSFUL_RESPONSE_STATUS_ENUM,
  HttpRequestMethod,
  HttpRequestMethodThatAllowsBodyInSuccessfulResponse,
  HttpRequestMethodThatForbidsBodyInErrorResponse,
  HttpRequestMethodThatForbidsBodyInSuccessfulResponse,
  HttpRequestMethodThatRequiresBodyInSuccessfulResponse,
} from "@little-nebulae/http";
import type { ExcludeStrict } from "type-fest";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { HTTP_RESPONSE_STATUS_ENUM } from "@little-nebulae/http";
import { attempt } from "@little-nebulae/result";

import type { HeaderRecord, NonNullableBodyInit } from "@/types";

type CreateResponseParams =
  | {
      isOk: true;
      inputs:
        | {
            requestMethod: HttpRequestMethodThatRequiresBodyInSuccessfulResponse;
            body: NonNullableBodyInit;
            status: keyof typeof HTTP_SUCCESSFUL_RESPONSE_STATUS_ENUM;
            headers?: HeaderRecord;
          }
        | {
            requestMethod: HttpRequestMethodThatAllowsBodyInSuccessfulResponse;
            body?: NonNullableBodyInit;
            status: keyof typeof HTTP_SUCCESSFUL_RESPONSE_STATUS_ENUM;
            headers?: HeaderRecord;
          }
        | {
            requestMethod: HttpRequestMethodThatForbidsBodyInSuccessfulResponse;
            status: keyof typeof HTTP_SUCCESSFUL_RESPONSE_STATUS_ENUM;
            headers?: HeaderRecord;
          };
    }
  | {
      isOk: false;
      inputs:
        | {
            requestMethod: HttpRequestMethodThatForbidsBodyInErrorResponse;
            status: keyof typeof HTTP_ERROR_RESPONSE_STATUS_ENUM;
            headers?: HeaderRecord;
          }
        | {
            requestMethod: ExcludeStrict<
              HttpRequestMethod,
              HttpRequestMethodThatForbidsBodyInErrorResponse
            >;
            body: NonNullableBodyInit;
            status: keyof typeof HTTP_ERROR_RESPONSE_STATUS_ENUM;
            headers?: HeaderRecord;
          };
    };

export function webCreateResponse({ isOk, inputs }: CreateResponseParams) {
  return attempt({
    tryFn: () => {
      if (isOk) {
        if (
          inputs.requestMethod === "GET" ||
          inputs.requestMethod === "QUERY" ||
          inputs.requestMethod === "POST" ||
          inputs.requestMethod === "TRACE" ||
          inputs.requestMethod === "PUT" ||
          inputs.requestMethod === "PATCH" ||
          inputs.requestMethod === "DELETE" ||
          inputs.requestMethod === "OPTIONS"
        ) {
          return new Response(inputs.body, {
            status: HTTP_RESPONSE_STATUS_ENUM[inputs.status].CODE,
            statusText: HTTP_RESPONSE_STATUS_ENUM[inputs.status].TEXT,
            headers: inputs.headers ?? new Headers(),
          });
        }

        return new Response(undefined, {
          status: HTTP_RESPONSE_STATUS_ENUM[inputs.status].CODE,
          statusText: HTTP_RESPONSE_STATUS_ENUM[inputs.status].TEXT,
          headers: inputs.headers ?? new Headers(),
        });
      }

      if (inputs.requestMethod !== "HEAD") {
        return new Response(inputs.body, {
          status: HTTP_RESPONSE_STATUS_ENUM[inputs.status].CODE,
          statusText: HTTP_RESPONSE_STATUS_ENUM[inputs.status].TEXT,
          headers: inputs.headers ?? new Headers(),
        });
      }
      return new Response(undefined, {
        status: HTTP_RESPONSE_STATUS_ENUM[inputs.status].CODE,
        statusText: HTTP_RESPONSE_STATUS_ENUM[inputs.status].TEXT,
        headers: inputs.headers ?? new Headers(),
      });
    },
    catchFn: (error) =>
      new UnexpectedError({
        message: composeErrorMessage({ operation: "create a web response" }),
        cause: error,
        meta: null,
      }),
  });
}
