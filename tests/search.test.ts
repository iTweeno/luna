import { test } from "uvu";

import * as assert from "uvu/assert";

import { search } from "../src/v1/services/search";

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "postgresql://luna:a@localhost:5432/luna?schema=public";
}

test("Searching a word with less than 3 characters should throw an error", async () => {
  try {
    await search("aa");

    assert.unreachable("Should have thrown an error");
  } catch (e: any) {
    assert.is(e.message, "Term must be at least 3 characters long");
  }
});

test("Searching the word 'web' should return 10 results", async () => {
  const result = await search("web");

  assert.is(result.length, 10);
});

test("Searching the words 'developer web' should return 10 results", async () => {
  const result = await search("developer web");

  assert.is(result.length, 10);
});

test("Searching the words 'programming && web' should return 6 results", async () => {
  const result = await search("programming && web");

  assert.is(result.length, 6);
});

test("Searching the word 'the' should return 0 results", async () => {
  const result = await search("the");

  assert.is(result.length, 0);
});

test.run();
