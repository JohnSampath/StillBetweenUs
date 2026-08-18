import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const outputUrl = new URL("../aws-dist/", import.meta.url);
const html = await readFile(new URL("index.html", outputUrl), "utf8");
const robots = await readFile(new URL("robots.txt", outputUrl), "utf8");

test("interim site is non-indexable and contains no promotional media", () => {
  assert.match(html, /noindex,nofollow,noarchive,nosnippet,noimageindex/i);
  assert.match(html, /Permission review in progress/i);
  assert.match(html, /temporarily unavailable while artist and artwork permissions are documented/i);
  assert.doesNotMatch(html, /open[.]spotify[.]com|<iframe|<img|client[_ -]?secret|client[_ -]?id/i);
  assert.equal(robots, "User-agent: *\nDisallow: /\n");
});

test("interim export contains only the holding page and robots control", async () => {
  const files = (await readdir(outputUrl)).sort();
  assert.deepEqual(files, ["404.html", "index.html", "robots.txt"]);
});
