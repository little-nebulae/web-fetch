import { assert, describe, expect, test } from "vitest";

import { parseTextResponseBody } from "@/response/parse-text-body";

// Success cases
describe("parseTextResponseBody function should succeed", async () => {
  test("at reading text response body", async () => {
    const bodyText = "Hello there!";
    const response = new Response(bodyText);

    const parseResult = await parseTextResponseBody({ response });
    assert(parseResult.success);
    expect(parseResult.data).toBe(bodyText);
  });

  test("at reading empty response body", async () => {
    const response = new Response();

    const parseResult = await parseTextResponseBody({ response });
    assert(parseResult.success);

    const bodyText = parseResult.data;
    expect(typeof bodyText === "string").toBe(true);
    expect(bodyText).toHaveLength(0);
  });
});
