import { Worker } from 'node:worker_threads';

// Matches V8's regexp engine reporting that it ran out of stack while compiling
// (lazily, on first exec) a very large / disjunction-heavy pattern. V8 surfaces
// this as `SyntaxError: Invalid regular expression: /.../: Stack overflow`, and
// generic JS recursion overflows as `RangeError: Maximum call stack size
// exceeded`. We tolerate both spellings.
const STACK_OVERFLOW_RE = /stack overflow|maximum call stack|call stack size/i;

// Worker body. Runs the identical match the main thread attempted, but on a
// thread we give an explicit, ample stack. Kept as an eval string (rather than a
// separate built file) so it survives bundling without a second tsdown entry or
// fragile import.meta.url path resolution. CommonJS `require` works inside an
// eval worker even when the host package is ESM.
const WORKER_SOURCE = `
const { parentPort, workerData } = require('node:worker_threads');
try {
  const { source, flags, content } = workerData;
  const re = new RegExp(source, flags);
  const matches = [];
  let m;
  while ((m = re.exec(content)) !== null) {
    matches.push({ index: m.index, groups: Array.from(m) });
    if (m[0].length === 0) re.lastIndex++;
  }
  parentPort.postMessage({ ok: true, matches });
} catch (err) {
  parentPort.postMessage({ ok: false, error: (err && err.message) || String(err) });
}
`;

const withGlobal = (flags: string): string =>
  flags.includes('g') ? flags : flags + 'g';

const runInline = (
  source: string,
  flags: string,
  content: string
): RegExpExecArray[] => {
  const re = new RegExp(source, withGlobal(flags));
  const matches: RegExpExecArray[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(content)) !== null) {
    matches.push(m);
    if (m[0].length === 0) re.lastIndex++;
  }
  return matches;
};

// Exported for tests so the worker path can be exercised deterministically on
// any platform (the inline path only overflows where the default stack is
// small). Production code reaches it through findAllMatchesWithStackFallback.
export const findAllMatchesInWorker = (
  source: string,
  flags: string,
  content: string
): Promise<RegExpExecArray[]> =>
  new Promise((resolve, reject) => {
    const worker = new Worker(WORKER_SOURCE, {
      eval: true,
      workerData: { source, flags: withGlobal(flags), content },
      // The pattern is valid; it just needs more stack than V8's small default
      // to compile. A generous, explicit thread stack removes the platform
      // dependence (Windows' ~1MB default overflows where macOS' larger default
      // does not).
      resourceLimits: { stackSizeMb: 16 },
    });
    worker.once(
      'message',
      (msg: {
        ok: boolean;
        matches?: Array<{ index: number; groups: Array<string | undefined> }>;
        error?: string;
      }) => {
        void worker.terminate();
        if (!msg.ok) {
          reject(new Error(msg.error ?? 'regex worker failed'));
          return;
        }
        // Rebuild RegExpExecArray-shaped objects: an array of the captured
        // groups (index 0 = full match) carrying an `.index` property, which is
        // all downstream consumers read.
        const rebuilt = (msg.matches ?? []).map(({ index, groups }) => {
          const arr = groups as unknown as RegExpExecArray;
          arr.index = index;
          return arr;
        });
        resolve(rebuilt);
      }
    );
    worker.once('error', err => {
      void worker.terminate();
      reject(err);
    });
  });

/**
 * Find every match of a generated system-prompt regex in cli.js content.
 *
 * System-prompt search regexes are built per-character from pristine prompt
 * text (each backslash/backtick/quote/newline becomes an escape-tolerant
 * alternation — see `buildSearchRegexFromPieces`). For very large prompts (e.g.
 * the multi-thousand-line skill docs) the resulting pattern is hundreds of
 * thousands of characters with thousands of disjunctions. The pattern is valid
 * and matches fine on macOS/Linux, but V8 compiles regexes lazily on first
 * `exec`, and that compilation overflows Windows' smaller default stack —
 * throwing `Invalid regular expression: ...: Stack overflow` and, before this
 * guard, aborting the entire `--apply` (taking down every other prompt with it).
 *
 * Fast path runs inline. Only when the inline compile overflows do we re-run the
 * identical match on a worker thread with an explicit 16MB stack, so the result
 * is byte-for-byte what every other platform produces.
 */
export const findAllMatchesWithStackFallback = async (
  source: string,
  flags: string,
  content: string
): Promise<RegExpExecArray[]> => {
  try {
    return runInline(source, flags, content);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (!STACK_OVERFLOW_RE.test(message)) throw err;
    return findAllMatchesInWorker(source, flags, content);
  }
};
