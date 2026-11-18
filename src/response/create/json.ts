import type {
  HTTP_ERROR_RESPONSE_STATUS_ENUM,
  HTTP_SUCCESSFUL_RESPONSE_STATUS_ENUM,
  HttpRequestMethod,
} from "@little-nebulae/http";
import type { ExcludeFrom } from "@little-nebulae/utility-types";
import type { Except, JsonValue } from "type-fest";

import { HTTP_RESPONSE_STATUS_ENUM } from "@little-nebulae/http";

import type { HeaderRecord } from "@/types";

type CreateJsonResponseParams =
  | {
      requestMethod: ExcludeFrom<HttpRequestMethod, "HEAD" | "CONNECT">;
      data: JsonValue;
      status: keyof typeof HTTP_SUCCESSFUL_RESPONSE_STATUS_ENUM;
      headers?: Except<HeaderRecord, "content-type">;
    }
  | {
      requestMethod: ExcludeFrom<HttpRequestMethod, "HEAD">;
      data: JsonValue;
      status: keyof typeof HTTP_ERROR_RESPONSE_STATUS_ENUM;
      headers?: Except<HeaderRecord, "content-type">;
    };

export function webCreateJsonResponse({
  data,
  status,
  headers,
}: CreateJsonResponseParams) {
  return Response.json(data, {
    status: HTTP_RESPONSE_STATUS_ENUM[status].CODE,
    statusText: HTTP_RESPONSE_STATUS_ENUM[status].TEXT,
    headers: headers ?? new Headers(),
  });
}
