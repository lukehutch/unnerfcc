/**
 * Config-path shim for the vendored prompt-patcher module.
 *
 * The real tweakcc-fixed `src/config.ts` computes a user config dir under
 * `~/.tweakcc` (or `$TWEAKCC_CONFIG_DIR`) and pulls in a large surface (settings
 * loading, migration, native-installer detection). The prompt-patcher only reads
 * the four path constants below. This shim reproduces just those, sourced from
 * env vars the CLI (`cli.mjs`) sets before importing the graph, so the .md
 * prompt directory can be pointed at an arbitrary caller-supplied path instead of
 * a fixed `~/.tweakcc/system-prompts`.
 *
 * - SYSTEM_PROMPTS_DIR   : dir of edited `<promptId>.md` files (replacement text)
 * - SYSTEM_REMINDERS_DIR : dir of `<id>.md` reminder overrides (for shadow scan)
 * - CONFIG_DIR           : parent config dir (only used by the hash-index shim,
 *                          which no-ops its writes, so this need not exist)
 * - PROMPT_CACHE_DIR     : network-download cache dir (unused; download shim reads
 *                          a local catalog instead)
 */
import * as path from 'node:path';
import * as os from 'node:os';

export const SYSTEM_PROMPTS_DIR =
  process.env.UNNERF_SYSTEM_PROMPTS_DIR ??
  path.join(os.tmpdir(), 'unnerf-system-prompts');

// A reminders dir is optional. When the caller doesn't supply one, point at a
// sibling `system-reminders` next to the prompts dir; loadShadowSet tolerates a
// missing dir (readdir throws -> `continue`), so a nonexistent path is harmless.
export const SYSTEM_REMINDERS_DIR =
  process.env.UNNERF_SYSTEM_REMINDERS_DIR ??
  path.join(path.dirname(SYSTEM_PROMPTS_DIR), 'system-reminders');

export const CONFIG_DIR =
  process.env.UNNERF_CONFIG_DIR ?? path.join(os.tmpdir(), 'unnerf-config');

export const PROMPT_CACHE_DIR = path.join(CONFIG_DIR, 'prompt-data-cache');
