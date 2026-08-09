import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://stillbetweenus.secrix.org/", {
      headers: { accept: "text/html", host: "stillbetweenus.secrix.org" },
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete Still Between Us page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Still Between Us/);
  assert.match(html, /Three songs/i);
  assert.match(html, /One emotional arc/i);
  assert.match(html, /453aUdNFOWRqDIFmEEvziB/);
  assert.match(html, /2wQkI8Rrk6S2kZwq4ZWa9N/);
  assert.match(html, /1lrNpN3xcpbmQQXbzo2J8e/);
  assert.match(html, /6trOBkH8l8LWGQgo9DmZSH/);
  assert.match(html, /Privacy &amp; cookies/i);
  assert.match(html, /Spotify Widget Terms/i);
  assert.match(html, /Load Spotify players/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
  assert.doesNotMatch(html, /client[_ -]?secret|spotify[_ -]?client[_ -]?id/i);
});

test("Spotify embeds are consent-gated in initial HTML", async () => {
  const html = await (await render()).text();
  assert.doesNotMatch(html, /<iframe[^>]+open[.]spotify[.]com\/embed/i);
  assert.match(html, /Spotify player is off until you choose/i);
});
