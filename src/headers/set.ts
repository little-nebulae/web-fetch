import type { HttpHeader } from "@little-nebulae/http";

export function setHeader({
  headers,
  name,
  value,
}: {
  headers: Headers;
  name: HttpHeader;
  value: string;
}) {
  headers.set(name, value);
}
