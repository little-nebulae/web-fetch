import type {
  HTTP_ERROR_RESPONSE_STATUS_ENUM,
  HTTP_SUCCESSFUL_RESPONSE_STATUS_ENUM,
  HttpRequestMethod,
} from "@little-nebulae/http";
import type { ExcludeFrom, ExtractFrom } from "@little-nebulae/utility-types";

import type { BodyInit, HeadersInit } from "@/types";

export type CreateResponseParams =
  | {
      isOk: true;
      inputs:
        | {
            requestMethod: ExtractFrom<
              HttpRequestMethod,
              "GET" | "QUERY" | "POST" | "TRACE"
            >;
            body: BodyInit;
            status: keyof typeof HTTP_SUCCESSFUL_RESPONSE_STATUS_ENUM;
            headers?: HeadersInit;
          }
        | {
            requestMethod: ExtractFrom<
              HttpRequestMethod,
              "PUT" | "PATCH" | "DELETE" | "OPTIONS"
            >;
            body?: BodyInit;
            status: keyof typeof HTTP_SUCCESSFUL_RESPONSE_STATUS_ENUM;
            headers?: HeadersInit;
          }
        | {
            requestMethod: ExtractFrom<HttpRequestMethod, "HEAD" | "CONNECT">;
            status: keyof typeof HTTP_SUCCESSFUL_RESPONSE_STATUS_ENUM;
            headers?: HeadersInit;
          };
    }
  | {
      isOk: false;
      inputs:
        | {
            requestMethod: ExtractFrom<HttpRequestMethod, "HEAD">;
            status: keyof typeof HTTP_ERROR_RESPONSE_STATUS_ENUM;
            headers?: HeadersInit;
          }
        | {
            requestMethod: ExcludeFrom<HttpRequestMethod, "HEAD">;
            body: BodyInit;
            status: keyof typeof HTTP_ERROR_RESPONSE_STATUS_ENUM;
            headers?: HeadersInit;
          };
    };
