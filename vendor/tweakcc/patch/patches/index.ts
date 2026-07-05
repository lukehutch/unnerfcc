/**
 * Patch-registry shim for the vendored prompt-patcher module.
 *
 * The real tweakcc-fixed `src/patches/index.ts` is the whole-application patch
 * registry — it imports every patch module (TUI, model selector, themes, ink/
 * react, etc.). `applySystemPrompts` only needs three symbols from it:
 *   - `PatchGroup`   (enum) — copied verbatim
 *   - `PatchResult`  (interface) — copied verbatim
 *   - `showDiff`     — a debug-only diff printer; reduced to a no-op here
 *
 * `showDiff` in upstream renders a coloured word diff only when the verbose/
 * show-unchanged debug flags are set; it has no effect on the patched output, so
 * a no-op is behaviorally faithful for the patcher's purpose.
 */

// Verbatim from tweakcc-fixed src/patches/index.ts.
export enum PatchGroup {
  SYSTEM_PROMPTS = 'System Prompts',
  ALWAYS_APPLIED = 'Always Applied',
  MISC_CONFIGURABLE = 'Misc Configurable',
  FEATURES = 'Features',
  SYSTEM_REMINDERS = 'System Reminders',
}

// Verbatim from tweakcc-fixed src/patches/index.ts.
export interface PatchResult {
  id: string;
  name: string;
  group: PatchGroup;
  applied: boolean;
  failed?: boolean;
  skipped?: boolean;
  details?: string;
  description?: string;
  modelFacing?: boolean;
}

// Debug-only diff printer in upstream; a no-op here (no effect on output).
export const showDiff = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ..._args: unknown[]
): void => {
  /* no-op */
};
