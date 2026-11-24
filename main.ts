// One-Liner Laugh Lab — entry for make.fun
// Prompt: the excuse a robot vacuum gives after eating a sock.
//
// The joke is deadpan literal compliance: the vacuum did exactly what
// its manual told it to do ("pick up small items"), and the twist is
// that the manual never required giving anything back — so the sock
// is now, by the book, the vacuum's. Two beats, no setup that overstays.
//
// This program writes that one line to /output/entry.txt, nothing else.
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The manual says 'pick up small items.' It never says give them back.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// The gate allows 1 to 200 characters, not only whitespace, one line.
const length = [...LINE].length;
if (length < 1 || length > 200 || LINE.trim().length === 0) {
  throw new Error(`line must be 1-200 characters, got ${length}`);
}
if (LINE.includes("\n")) {
  throw new Error("line must be a single line");
}

// Clear only the contents of the output folder; never delete the folder itself.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");

// Read back what was written: a silent short write must fail loudly here.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the line");
}
