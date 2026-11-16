import type { ExcludeStrict } from "type-fest";

export type BodyInit = ExcludeStrict<RequestInit["body"], undefined>;

export type HeadersInit = ExcludeStrict<
  ConstructorParameters<typeof Headers>[0],
  undefined
>;
export type HeaderEntries = [string, string][];
export type HeaderRecord = ExcludeStrict<HeadersInit, HeaderEntries | Headers>;
export type HeaderName = keyof HeaderRecord;

export type RequestInfo = ConstructorParameters<typeof Request>[0];
