// Entry program for the news-image-20261123 bounty.
//
// The image itself is the entry: a dense newspaper front page summing up
// the world news of Monday 23 November 2026 (51 stories). This program
// only places that image where the grader expects it, at
// <MAKEFUN_OUTPUT_DIR>/entry.png, and does nothing else. It needs no
// network, no extra packages, and no arguments, so a second run writes
// the exact same bytes as the first.

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The repository root is the folder this file lives in.
const repoRoot = dirname(fileURLToPath(import.meta.url));
const bundledImage = join(repoRoot, "entry.png");

if (!existsSync(bundledImage)) {
  throw new Error(`bundled image missing: ${bundledImage}`);
}

// The harness sets MAKEFUN_OUTPUT_DIR; fall back to /output when run by hand.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const destination = join(outDir, "entry.png");
copyFileSync(bundledImage, destination);

// The two graded runs must produce identical bytes. A plain copy of a
// fixed file is deterministic by construction, but check the result
// anyway so a truncated write fails loudly instead of passing silently.
const sourceSize = statSync(bundledImage).size;
const writtenSize = statSync(destination).size;
if (sourceSize !== writtenSize) {
  throw new Error(
    `copy mismatch: source ${sourceSize} bytes, wrote ${writtenSize} bytes`,
  );
}

console.log(`entry.png (${writtenSize} bytes) written to ${destination}`);
