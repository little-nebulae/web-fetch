import type { ExcludeStrict } from "type-fest";

export type BodyInit = ExcludeStrict<RequestInit["body"], undefined>;
