import type { HeaderName } from "@/types";

export function hasHeader({
  headers,
  name,
}: {
  headers: Headers;
  name: HeaderName;
}) {
  return headers.has(name);
}
