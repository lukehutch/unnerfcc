/**
 * Local-catalog shim for the vendored prompt-patcher module.
 *
 * The real tweakcc-fixed `src/systemPromptDownload.ts` resolves the per-version
 * prompt catalog (`prompts-<version>.json`, a StringsFile) from repo-local
 * `data/prompts/` → user cache → GitHub network fetch. The vendored patcher must
 * NOT touch the network: it loads the catalog from an explicit local path the CLI
 * provides via `UNNERF_CATALOG_PATH`.
 *
 * - `downloadStringsFile(version)` reads and parses that local catalog JSON. The
 *   `version` argument is ignored for resolution (the caller pairs the right
 *   catalog with the right binary) but the function still validates the parse.
 * - `findRepoPromptsDir()` returns the directory containing the catalog, so
 *   `loadIdentifierMapUnion` (systemPromptSync) can scan sibling `prompts-*.json`
 *   for the leaked-placeholder guard's cross-version union.
 */
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import type { StringsFile } from './systemPromptSync';

const catalogPath = (): string => {
  const p = process.env.UNNERF_CATALOG_PATH;
  if (!p) {
    throw new Error(
      'UNNERF_CATALOG_PATH is not set — the CLI must point it at a local prompts-<version>.json catalog'
    );
  }
  return p;
};

export function findRepoPromptsDir(): string | null {
  const p = process.env.UNNERF_CATALOG_PATH;
  return p ? path.dirname(p) : null;
}

export async function downloadStringsFile(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  version: string
): Promise<StringsFile> {
  const p = catalogPath();
  const text = await fs.readFile(p, 'utf-8');
  return JSON.parse(text) as StringsFile;
}
