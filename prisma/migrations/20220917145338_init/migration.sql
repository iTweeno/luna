CREATE EXTENSION "uuid-ossp";

CREATE TABLE "search_prompts" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "title" TEXT NOT NULL,
    "content" JSONB NOT NULL
);

ALTER TABLE "search_prompts" ADD CONSTRAINT "search_prompts_pkey" PRIMARY KEY ("id");

ALTER TABLE "search_prompts" ADD COLUMN "textSearch" TSVECTOR
  GENERATED ALWAYS AS
    (setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
      setweight(to_tsvector('english', coalesce(content->>'body', '')), 'B'))
  STORED;

CREATE INDEX "search_prompts_textSearch_idx" ON "search_prompts" USING GIN ("textSearch");