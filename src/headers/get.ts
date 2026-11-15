import type { HeaderRecord } from "@/types";

export function getHeader({
  headers,
  name,
}: {
  headers: Headers;
  name: keyof HeaderRecord;
}) {
  return headers.get(name);
}
