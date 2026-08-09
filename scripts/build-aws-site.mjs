import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const output = path.join(root, "aws-dist");
const source = path.join(root, "aws-site");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

const html = await readFile(path.join(source, "index.html"), "utf8");
const css = (await readFile(path.join(root, "app", "globals.css"), "utf8"))
  .replace(/^@import\s+["']tailwindcss["'];\s*/m, "");

await writeFile(path.join(output, "index.html"), html, "utf8");
await writeFile(path.join(output, "styles.css"), css, "utf8");
await copyFile(path.join(source, "site.js"), path.join(output, "site.js"));

for (const asset of ["og.png", "still-between-us-cover.png", "favicon.svg"]) {
  await copyFile(path.join(root, "public", asset), path.join(output, asset));
}

await writeFile(
  path.join(output, "robots.txt"),
  "User-agent: *\nAllow: /\nSitemap: https://stillbetweenus.secrix.org/sitemap.xml\n",
  "utf8",
);

await writeFile(
  path.join(output, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://stillbetweenus.secrix.org/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url></urlset>\n`,
  "utf8",
);

await writeFile(
  path.join(output, "404.html"),
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found — Still Between Us</title><link rel="stylesheet" href="/styles.css"></head><body><main class="share-section shell"><p class="eyebrow centered"><span></span>404</p><h1>That song is not here.</h1><p class="share-deck">Return to the three-song listening story.</p><a class="button button-primary" href="/">Back to Still Between Us</a></main></body></html>`,
  "utf8",
);

console.log(`AWS static site built at ${output}`);
