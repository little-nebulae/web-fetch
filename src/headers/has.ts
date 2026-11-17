import type { HttpHeader } from "@little-nebulae/http";

export function hasHeader({
  headers,
  name,
}: {
  headers: Headers;
  name: HttpHeader;
}) {
  return headers.has(name);
}
