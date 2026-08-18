import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const output = path.join(root, "aws-dist");
const interimHtml = await readFile(path.join(root, "aws-site", "interim.html"), "utf8");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await writeFile(path.join(output, "index.html"), interimHtml, "utf8");
await writeFile(path.join(output, "404.html"), interimHtml, "utf8");
await writeFile(
  path.join(output, "robots.txt"),
  "User-agent: *\nDisallow: /\n",
  "utf8",
);

console.log(`Interim compliance site built at ${output}`);
