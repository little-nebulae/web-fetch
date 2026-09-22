import type { HttpHeader } from "@little-nebulae/http";

export function createHeaders(init: { [header in HttpHeader]: string }) {
  const headers = new Headers(init);
  return headers;
}
