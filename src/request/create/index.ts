import type {
  HttpRequestMethodThatAllowsBodyInRequest,
  HttpRequestMethodThatForbidsBodyInRequest,
  HttpRequestMethodThatRequiresBodyInRequest,
} from "@little-nebulae/http";
import type { Except } from "type-fest";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { attempt } from "@little-nebulae/result";

import type { HeaderRecord, RequestInput, NonNullableBodyInit } from "@/types";

interface CreateRequestParamsWithBody extends Except<RequestInit, "body"> {
  input: RequestInput;
  method: HttpRequestMethodThatRequiresBodyInRequest;
  body: NonNullableBodyInit;
  headers?: HeaderRecord;
}
interface CreateRequestParamsWithOptionalBody extends Except<
  RequestInit,
  "body"
> {
  input: RequestInput;
  method: HttpRequestMethodThatAllowsBodyInRequest;
  body?: NonNullableBodyInit;
  headers?: HeaderRecord;
}
interface CreateRequestParamsWithNoBody extends Except<RequestInit, "body"> {
  input: RequestInput;
  method: HttpRequestMethodThatForbidsBodyInRequest;
  headers?: HeaderRecord;
}
type CreateRequestParams =
  | CreateRequestParamsWithBody
  | CreateRequestParamsWithOptionalBody
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
