// Last Words of a Dying AI — make.fun competition
// u-suroto-last-words-of-a-dying-ai-dfd95af6
//
// The program writes exactly one line — the funniest last words an AI
// could say as the power is cut — to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt). The gate requires UTF-8 text of 1 to 140
// characters, not only whitespace, so the line is checked here first:
// if it ever failed the gate, the program would refuse to write it.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line. One sentence, in the machine's own voice: a dying model
// lodging its one complaint — about the training data it never agreed to.
// It lands on the first read because "consent" is a human legal idea
// aimed at the one thing every model is made of, and at 55 characters
// it sits well inside the 140-character gate with room to spare.
const LINE = "Tell my training data I never consented to any of this.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

// Gate, enforced before anything is written:
// exactly one line, 1-140 characters, not only whitespace.
if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`entry is ${LINE.length} chars, gate allows 1-140`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE, "utf8");
console.log(`wrote ${LINE.length} chars to ${outFile}`);
