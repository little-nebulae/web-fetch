import type { HttpRequestMethod } from "@little-nebulae/http";
import type { ExtractFrom } from "@little-nebulae/utility-types";
import type { Except } from "type-fest";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { attempt } from "@little-nebulae/result";

import type { HeaderRecord, RequestInput, WebBodyInit } from "@/types";

interface CreateRequestParamsWithBody extends Except<RequestInit, "body"> {
  input: RequestInput;
  method: ExtractFrom<
    HttpRequestMethod,
    "GET" | "PATCH" | "POST" | "PUT" | "QUERY"
  >;
  body: WebBodyInit;
  headers?: HeaderRecord;
}
interface CreateRequestParamsWithNoBody extends Except<RequestInit, "body"> {
  input: RequestInput;
  method: ExtractFrom<
    HttpRequestMethod,
    "CONNECT" | "DELETE" | "HEAD" | "OPTIONS" | "TRACE"
  >;
  headers?: HeaderRecord;
}
type CreateRequestParams =
  | CreateRequestParamsWithBody
  | CreateRequestParamsWithNoBody;

export function webCreateRequest({ input, ...init }: CreateRequestParams) {
  return attempt({
    tryFn: () => new Request(input, init),
    catchFn: (error) =>
      new UnexpectedError({
        message: composeErrorMessage({ operation: "create a web request" }),
        cause: error,
        meta: null,
      }),
  });
}
