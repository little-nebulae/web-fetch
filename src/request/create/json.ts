import type { HttpRequestMethod } from "@little-nebulae/http";
import type { ExtractFrom } from "@little-nebulae/utility-types";
import type { Except, JsonValue } from "type-fest";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { HTTP_APPLICATION_MEDIA_TYPE_ENUM } from "@little-nebulae/http";
import { DEFAULT_JSON_STRINGIFY_SPACE } from "@little-nebulae/json";
import { attempt } from "@little-nebulae/result";

import type { HeaderRecord } from "@/types";

import { createHeaders } from "@/headers/create";

interface CreateJsonRequestParams extends Except<RequestInit, "body"> {
  method: ExtractFrom<
    HttpRequestMethod,
    "GET" | "PATCH" | "POST" | "PUT" | "QUERY"
  >;
  input: string | URL;
  data: JsonValue;
  headers?: Except<HeaderRecord, "content-type">;
}

export function webCreateJsonRequest({
  input,
  data,
  headers,
  ...init
}: CreateJsonRequestParams) {
  return attempt({
    tryFn: () =>
      new Request(input, {
        body: JSON.stringify(data, null, DEFAULT_JSON_STRINGIFY_SPACE),
        headers: createHeaders({
          "content-type": HTTP_APPLICATION_MEDIA_TYPE_ENUM.JSON,
          ...headers,
        }),
        ...init,
      }),
    catchFn: (error) =>
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "create a json web request",
        }),
        cause: error,
        meta: null,
      }),
  });
}
