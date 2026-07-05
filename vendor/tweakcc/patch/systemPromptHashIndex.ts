/**
 * Hash-index shim for the vendored prompt-patcher module.
 *
 * The real tweakcc-fixed `src/systemPromptHashIndex.ts` persists two JSON indexes
 * under the user config dir to track which prompt versions/hashes were last
 * synced/applied (used by the TUI to show "unapplied changes"). The one-shot
 * patcher does not need that persistence, so the disk-backed functions are
 * no-ops here. `computeMD5Hash` is copied verbatim because `applySystemPrompts`
 * computes an applied-hash per prompt (the result is discarded by the no-op
 * `setAppliedHashes`, but the call must still succeed).
 *
 * `StringsFile` is only referenced as a type by the real module's signatures; we
 * re-export the type from systemPromptSync for signature parity.
 */
import * as crypto from 'node:crypto';
import type { StringsFile } from './systemPromptSync';

// Verbatim from tweakcc-fixed src/systemPromptHashIndex.ts.
export const computeMD5Hash = (content: string): string => {
  return crypto.createHash('md5').update(content.trim(), 'utf8').digest('hex');
};

// --- No-op persistence (the patcher is stateless) -------------------------

export const storeHashes = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _stringsFile: StringsFile
): Promise<void> => {
  /* no-op: the one-shot patcher does not persist a hash index */
};

export const getPromptHash = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _promptId: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _version: string
): Promise<string | null> => null;

export const setAppliedHashes = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _updates: Record<string, string>
): Promise<void> => {
  /* no-op */
};
