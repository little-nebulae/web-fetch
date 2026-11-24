import type {
  HttpRequestMethodThatAllowsBodyInRequest,
  HttpRequestMethodThatRequiresBodyInRequest,
} from "@little-nebulae/http";
import type { Except, JsonValue } from "type-fest";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { HTTP_APPLICATION_MEDIA_TYPE_ENUM } from "@little-nebulae/http";
import { jsonStringifyLosslessValue } from "@little-nebulae/json";
import { produceResult } from "@little-nebulae/result";

import type { HeaderRecord } from "@/types";

import { createHeaders } from "@/headers/create";

interface CreateJsonRequestParams extends Except<RequestInit, "body"> {
  method:
    | HttpRequestMethodThatRequiresBodyInRequest
    | HttpRequestMethodThatAllowsBodyInRequest;
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
  return produceResult({
    tryFn: () =>
      new Request(input, {
        body: jsonStringifyLosslessValue({ value: data }),
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
