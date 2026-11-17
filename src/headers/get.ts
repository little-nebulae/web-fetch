import type { HttpHeader } from "@little-nebulae/http";

export function getHeader({
  headers,
  name,
}: {
  headers: Headers;
  name: HttpHeader;
}) {
  return headers.get(name);
}
