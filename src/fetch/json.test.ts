import { assert, describe, expect, test } from "vitest";

import { fetchJson } from "@/fetch/json";

// Success cases
describe("fetchJson function should succeed", async () => {
  test("at getting json data", async () => {
    const request = new Request("https://dummyjson.com/todos/1");

    const fetchResult = await fetchJson({ request });
    assert(fetchResult.success);

    const jsonData = fetchResult.data;
    expect(jsonData).toHaveProperty("id");
    expect(jsonData).toHaveProperty("todo");
  });
});
