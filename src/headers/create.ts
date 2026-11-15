import type { HeaderRecord } from "@/types";

export function createHeaders(record: HeaderRecord): Headers {
  const headers = new Headers(record);
  return headers;
}
