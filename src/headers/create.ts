import type { HttpHeader } from "@little-nebulae/http";

export function createHeaders(init: {
  [header in HttpHeader]: string;
}): Headers {
  const headers = new Headers(init);
  return headers;
}
