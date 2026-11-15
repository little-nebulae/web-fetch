import type { HeaderName } from "@/types";

export function getHeader({
  headers,
  name,
}: {
  headers: Headers;
  name: HeaderName;
}) {
  return headers.get(name);
}
