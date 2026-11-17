import type { HttpHeader } from "@little-nebulae/http";

export type HeaderEntries = [string, string][];
export type HeaderRecord = Partial<Record<HttpHeader, string>>;

export type RequestInput = ConstructorParameters<typeof Request>[0];

export type NonNullableBodyInit = NonNullable<RequestInit["body"]>;
