import { test } from "uvu";

import buildFastify from "../src/utils/buildFastify";

import * as assert from "uvu/assert";
import { FastifyInstance } from "fastify";

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "postgresql://luna:a@localhost:5432/luna?schema=public";
}

let app: FastifyInstance;

test.before(() => {
  app = buildFastify();
});

test("Searching a word with less than 3 characters should throw an error", async () => {
  const response = await app.inject({
    method: "GET",
    url: "/api/v1/search/aa",
  });

  assert.is(response.statusCode, 400);
});

test("Searching the word 'web' should return 10 results", async () => {
  const response = await app.inject({
    method: "GET",
    url: "/api/v1/search/web",
  });

  assert.is(JSON.parse(response.payload).length, 10);
});

test("Searching the words 'developer web' should return 10 results", async () => {
  const response = await app.inject({
    method: "GET",
    url: "/api/v1/search/developer web",
  });

  assert.is(JSON.parse(response.payload).length, 10);
});

test("Searching the words 'ASP.NET & programming' should return 6 results", async () => {
  const response = await app.inject({
    method: "GET",
    url: "/api/v1/search/ASP.NET & programming",
  });

  assert.is(JSON.parse(response.payload).length, 7);
});

test("Searching the word 'the' should return 0 results", async () => {
  const response = await app.inject({
    method: "GET",
    url: "/api/v1/search/the",
  });

  assert.is(JSON.parse(response.payload).length, 0);
});

test.after(() => {
  app.close();
});

test.run();
