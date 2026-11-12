import type { ExcludeExactly } from "type-fest";

export type BodyInit = ExcludeExactly<RequestInit["body"], undefined>;
