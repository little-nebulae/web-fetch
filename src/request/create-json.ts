import type { UnexpectedError } from "@little-nebulae/error";
import type { HttpRequestMethod } from "@little-nebulae/http";
import type { Result } from "@little-nebulae/result";
import type { JSONType } from "zod";

import { stringifyJsonValue } from "@little-nebulae/json";

import { createRequest } from "@/request/create";

export function createJsonRequest({
  url,
  method,
  headers,
  body,
}: {
  url: string | URL;
  method: Extract<HttpRequestMethod, "POST" | "PUT" | "DELETE" | "PATCH">;
  headers?: Headers;
  body: JSONType;
}): Result<Request, UnexpectedError> {
  const jsonString = stringifyJsonValue({ value: body });
  return createRequest({ url, method, headers, body: jsonString });
}
