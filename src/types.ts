import type { HttpHeader } from "@little-nebulae/http";
import type { ExcludeStrict } from "type-fest";

export type BodyInit = ExcludeStrict<RequestInit["body"], undefined>;

export type HeaderEntries = [string, string][];
export type HeaderRecord = Partial<Record<HttpHeader, string>>;
export type HeadersInit = HeaderEntries | HeaderRecord | Headers;
