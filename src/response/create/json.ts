import type {
  HTTP_ERROR_RESPONSE_STATUS_ENUM,
  HTTP_SUCCESSFUL_RESPONSE_STATUS_ENUM,
  HttpRequestMethod,
} from "@little-nebulae/http";
import type { ExcludeFrom } from "@little-nebulae/utility-types";
import type { JsonValue } from "type-fest";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { HTTP_RESPONSE_STATUS_ENUM } from "@little-nebulae/http";
import { attempt } from "@little-nebulae/result";

import type { HeadersInit } from "@/types";

type CreateJsonResponseParams =
  | {
      isOk: true;
      inputs: {
        requestMethod: ExcludeFrom<HttpRequestMethod, "HEAD" | "CONNECT">;
        data: JsonValue;
        status: keyof typeof HTTP_SUCCESSFUL_RESPONSE_STATUS_ENUM;
        headers?: HeadersInit;
      };
    }
  | {
      isOk: false;
      inputs: {
        requestMethod: ExcludeFrom<HttpRequestMethod, "HEAD">;
        data: JsonValue;
        status: keyof typeof HTTP_ERROR_RESPONSE_STATUS_ENUM;
        headers?: HeadersInit;
      };
    };

export function webCreateJsonResponse({ inputs }: CreateJsonResponseParams) {
  return attempt({
    tryFn: () =>
      Response.json(inputs.data, {
        status: HTTP_RESPONSE_STATUS_ENUM[inputs.status].CODE,
        statusText: HTTP_RESPONSE_STATUS_ENUM[inputs.status].TEXT,
        headers: inputs.headers ?? new Headers(),
      }),
    catchFn: (error) =>
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "create a json web response",
        }),
        cause: error,
        meta: null,
      }),
  });
}
