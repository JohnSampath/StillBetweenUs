import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const html = await readFile(new URL("../aws-dist/index.html", import.meta.url), "utf8");
const css = await readFile(new URL("../aws-dist/styles.css", import.meta.url), "utf8");

test("AWS export contains the complete SEO page", () => {
  assert.match(html, /<title>Still Between Us — Three Songs by kkml<\/title>/);
  assert.match(html, /rel="canonical" href="https:\/\/stillbetweenus\.secrix\.org\/"/);
  assert.match(html, /453aUdNFOWRqDIFmEEvziB/);
  assert.match(html, /2wQkI8Rrk6S2kZwq4ZWa9N/);
  assert.match(html, /1lrNpN3xcpbmQQXbzo2J8e/);
  assert.match(html, /6trOBkH8l8LWGQgo9DmZSH/);
  assert.match(html, /Privacy &amp; cookies/);
  assert.match(html, /Spotify Widget Terms/);
  assert.match(html, /data-spotify-consent="allowed"/);
  assert.doesNotMatch(html, /<iframe[^>]+open\.spotify\.com\/embed/i);
  assert.doesNotMatch(html, /client[_ -]?secret|spotify[_ -]?client[_ -]?id/i);
});

test("AWS export includes production assets and compiled CSS", async () => {
  assert.doesNotMatch(css, /@import\s+["']tailwindcss/);
  await stat(new URL("../aws-dist/og.png", import.meta.url));
  await stat(new URL("../aws-dist/still-between-us-cover.png", import.meta.url));
  await stat(new URL("../aws-dist/robots.txt", import.meta.url));
  await stat(new URL("../aws-dist/sitemap.xml", import.meta.url));
});
