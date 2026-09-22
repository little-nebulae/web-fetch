import { assert, describe, expect, test } from "vitest";

import { parseJsonResponseBody } from "@/response/parse-json-body";

// Success cases
describe("parseTextResponseBody function should succeed", async () => {
  test("at parsing a valid json response body", async () => {
    const bodyJson = {
      id: 1,
      todo: "Do something nice for someone I care about",
      completed: true,
      userId: 26,
    };
    const response = Response.json(bodyJson);

    const parseResult = await parseJsonResponseBody({ response });
    assert(parseResult.success);
    expect(parseResult.data).toMatchObject(bodyJson);
  });

  test("at parsing text response body", async () => {
    const content = "Hello there!";
    const bodyText = `"${content}"`;
    const response = new Response(bodyText);

    const parseResult = await parseJsonResponseBody({ response });
    assert(parseResult.success);
    expect(parseResult.data).toBe(content);
  });
});
