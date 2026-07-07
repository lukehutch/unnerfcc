#!/usr/bin/env node
/**
 * beautify.mjs — un-minify the extracted Claude Code JS so prompts can be
 *                studied in context. A maintainer aid; the patch path works on
 *                the raw minified bundle, not this.
 *
 * The bundle is ~18MB of minified JS. Prettier-ing the whole thing is slow and
 * memory-hungry, so the default is a FOCUSED region beautify: give an anchor
 * substring (e.g. a distinctive phrase from a prompt) and a window, and it
 * pretty-prints just the code around it — enough to read a prompt and the code
 * that emits it. `--whole` beautifies the entire file (slow; needs lots of RAM).
 *
 * CLI:
 *   node beautify.mjs <in.js> --anchor "<substring>" [--window 8000] [-o out.js]
 *   node beautify.mjs <in.js> --offset <n> [--window 8000] [-o out.js]
 *   node beautify.mjs <in.js> --whole -o out.js
 */

import { readFileSync, writeFileSync, realpathSync } from "node:fs";
import prettier from "prettier";
import { parse } from "@babel/parser";
import { pathToFileURL } from "node:url";

/**
 * Find the smallest top-level statement (or its enclosing function/declaration)
 * whose source range contains `offset`, so we extract a SYNTACTICALLY COMPLETE
 * unit (an arbitrary byte slice would start mid-expression and never parse).
 */
function enclosingNodeSource(code, offset) {
  const ast = parse(code, { sourceType: "module", plugins: ["jsx", "typescript"], errorRecovery: true });
  let best = null;
  const visit = (node) => {
    if (!node || typeof node.type !== "string") return;
    if (typeof node.start === "number" && typeof node.end === "number" && node.start <= offset && offset < node.end) {
      // Prefer a function/declaration/statement-sized node over a tiny literal.
      if (/Function|Declaration|Statement|ObjectExpression|ArrayExpression/.test(node.type)) best = node;
    }
    for (const k of Object.keys(node)) {
      const v = node[k];
      if (Array.isArray(v)) v.forEach((c) => c && typeof c.type === "string" && visit(c));
      else if (v && typeof v.type === "string") visit(v);
    }
  };
  visit(ast.program);
  return best ? code.slice(best.start, best.end) : null;
}

function parseArgs(argv) {
  const a = { window: 8000, whole: false };
  for (let i = 1; i < argv.length; i++) {
    const k = argv[i];
    if (k === "--anchor") a.anchor = argv[++i];
    else if (k === "--offset") a.offset = parseInt(argv[++i], 10);
    else if (k === "--window") a.window = parseInt(argv[++i], 10);
    else if (k === "--whole") a.whole = true;
    else if (k === "-o" || k === "--out") a.out = argv[++i];
  }
  return a;
}

/** Format a JS string; falls back to the input if it isn't parseable alone. */
export async function beautify(code) {
  try {
    return await prettier.format(code, { parser: "babel", printWidth: 100, semi: true });
  } catch {
    // A mid-bundle slice usually isn't a complete program; wrap so prettier can
    // parse it, then unwrap.
    try {
      const wrapped = await prettier.format("(async()=>{" + code + "\n})();", { parser: "babel", printWidth: 100 });
      return wrapped;
    } catch (e) {
      throw new Error(`could not format (not valid JS in this slice): ${e.message}`);
    }
  }
}

async function main(argv) {
  const inPath = argv[0];
  if (!inPath) {
    console.error('usage: node beautify.mjs <in.js> (--anchor "text" | --offset N | --whole) [--window N] [-o out.js]');
    return 2;
  }
  const args = parseArgs(argv);
  const code = readFileSync(inPath, "utf8");

  let slice, header;
  if (args.whole) {
    slice = code;
    header = "// whole file";
  } else {
    let center;
    if (args.anchor) {
      center = code.indexOf(args.anchor);
      if (center < 0) return console.error(`anchor not found: ${args.anchor}`), 1;
    } else if (Number.isInteger(args.offset)) {
      center = args.offset;
    } else {
      return console.error("give --anchor, --offset, or --whole"), 2;
    }
    // Extract the enclosing complete statement/function (parse-safe).
    slice = enclosingNodeSource(code, center);
    if (!slice) {
      // Fallback: widen to a byte window (may not fully format).
      const start = Math.max(0, center - Math.floor(args.window / 2));
      slice = code.slice(start, Math.min(code.length, center + Math.ceil(args.window / 2)));
    }
    header = `// enclosing unit around ${args.anchor ? JSON.stringify(args.anchor) : "offset " + center}`;
  }

  const pretty = await beautify(slice);
  const output = header + "\n" + pretty;
  if (args.out) { writeFileSync(args.out, output); console.error(`wrote ${output.length} chars -> ${args.out}`); }
  else process.stdout.write(output);
  return 0;
}

// realpath argv[1] before comparing — import.meta.url is symlink-resolved by
// Node's loader, argv[1] isn't (e.g. macOS's /tmp -> /private/tmp), so a raw
// comparison silently skips main() while still exiting 0 when run through one.
if (process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) {
  main(process.argv.slice(2)).then((c) => process.exit(c || 0));
}
