import type { HttpRequestMethod } from "@little-nebulae/http";
import type { ExcludeFrom } from "@little-nebulae/utility-types";
import type { Except, JsonValue } from "type-fest";

import { HTTP_ERROR_RESPONSE_STATUS_ENUM } from "@little-nebulae/http";

import type { HeaderRecord } from "@/types";

export function webCreateErrorResponse({
  code,
  message,
  meta,
  status,
  headers,
}: {
  requestMethod: ExcludeFrom<HttpRequestMethod, "HEAD">;
  code: string;
  message: string;
  meta: JsonValue;
  status: keyof typeof HTTP_ERROR_RESPONSE_STATUS_ENUM;
  headers?: Except<HeaderRecord, "content-type">;
}) {
  return Response.json(
    { code, message, meta },
    {
      status: HTTP_ERROR_RESPONSE_STATUS_ENUM[status].CODE,
      statusText: HTTP_ERROR_RESPONSE_STATUS_ENUM[status].TEXT,
      headers: headers ?? new Headers(),
    },
  );
}
