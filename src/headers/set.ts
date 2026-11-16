import type { HeaderName } from "@/types";

export function setHeader({
  headers,
  name,
  value,
}: {
  headers: Headers;
  name: HeaderName;
  value: string;
}) {
  headers.set(name, value);
}
