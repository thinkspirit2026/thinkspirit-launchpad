import test from "node:test";
import assert from "node:assert/strict";
import {
  mkdtemp,
  mkdir,
  writeFile,
  readFile,
  rm,
  access,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createSpace, validSlug } from "../scripts/new-space.mjs";
test("slug accepts safe folder names and rejects traversal and ambiguous names", () => {
  for (const value of ["alice", "lin-study-kit", "project-01"])
    assert.ok(validSlug(value));
  for (const value of [
    undefined,
    "",
    "../escape",
    "a/b",
    "Name",
    "名字",
    "-name",
    "name-",
    "a--b",
    "a".repeat(49),
  ])
    assert.equal(validSlug(value), false);
});
test("creates a complete space, updates date, and never overwrites an existing space", async () => {
  const base = await mkdtemp(join(tmpdir(), "thinkspirit-test-"));
  try {
    await mkdir(join(base, "templates/space"), { recursive: true });
    await writeFile(
      join(base, "templates/space/index.md"),
      'updated: "2000-01-01"\nexample: false\n',
    );
    await writeFile(join(base, "templates/space/sketch.svg"), "<svg/>");
    const target = await createSpace("alice-project", base);
    const content = await readFile(join(target, "index.md"), "utf8");
    assert.ok(content.includes(new Date().toISOString().slice(0, 10)));
    assert.ok(content.includes("example: false"));
    await access(join(target, "sketch.svg"));
    await assert.rejects(createSpace("alice-project", base), /已存在/);
    assert.equal(await readFile(join(target, "index.md"), "utf8"), content);
    await assert.rejects(createSpace("../outside", base), /空间名/);
  } finally {
    await rm(base, { recursive: true, force: true });
  }
});
test("failed template copy cleans up the incomplete space", async () => {
  const base = await mkdtemp(join(tmpdir(), "thinkspirit-test-"));
  try {
    await assert.rejects(createSpace("empty", base));
    await assert.rejects(access(join(base, "src/content/spaces/empty")));
  } finally {
    await rm(base, { recursive: true, force: true });
  }
});
