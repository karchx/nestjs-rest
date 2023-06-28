CREATE TYPE "task_status" AS ENUM (
  'ToDo',
  'InProgress',
  'Done'
);

CREATE TABLE "User" (
  "id" bigserial PRIMARY KEY,
  "name" varchar NOT NULL,
  "email" varchar NOT NULL,
  "password" binary(60),
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "Task" (
  "id" bigserial PRIMARY KEY,
  "description" varchar NOT NULL,
  "status" task_status,
  "userId" bigint,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE INDEX ON "User" ("name");

CREATE INDEX ON "User" ("email");

CREATE INDEX ON "Task" ("userId");

ALTER TABLE "Task" ADD FOREIGN KEY ("userId") REFERENCES "User" ("id");
