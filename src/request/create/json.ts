import type { HttpRequestMethod } from "@little-nebulae/http";
import type { ExtractFrom } from "@little-nebulae/utility-types";
import type { Except, JsonValue } from "type-fest";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { DEFAULT_JSON_STRINGIFY_SPACE } from "@little-nebulae/json";
import { attempt } from "@little-nebulae/result";

interface CreateJsonRequestParams extends Except<RequestInit, "body"> {
  method: ExtractFrom<
    HttpRequestMethod,
    "GET" | "PATCH" | "POST" | "PUT" | "QUERY"
  >;
  input: string | URL;
  data: JsonValue;
}

export function webCreateJsonRequest({
  input,
  data,
  ...init
}: CreateJsonRequestParams) {
  return attempt({
    tryFn: () =>
      new Request(input, {
        body: JSON.stringify(data, null, DEFAULT_JSON_STRINGIFY_SPACE),
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
