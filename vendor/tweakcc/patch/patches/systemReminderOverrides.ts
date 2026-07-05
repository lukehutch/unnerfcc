/**
 * Reminder-registry shim for the vendored prompt-patcher module.
 *
 * The real tweakcc-fixed `src/patches/systemReminderOverrides.ts` is ~68 KB of
 * runtime system-reminder rewriting logic. `systemPromptSync.loadShadowSet` reads
 * exactly one thing from it: the union of every `ReminderInjection.shadows` list
 * — the named-prompt ids whose cli.js region a reminder override splices, so the
 * named-prompt pass must not try to re-match (and must not warn) on them.
 *
 * This shim reproduces only those shadow ids, extracted verbatim from the three
 * `shadows:` entries in the upstream REMINDER_REGISTRY (as of the vendored
 * revision). Keeping just the ids — rather than vendoring the whole module and
 * its `./index` (full patch registry) import — preserves loadShadowSet's behavior
 * while keeping the dependency graph closed. Re-check these against upstream when
 * re-vendoring (see UPSTREAM.md).
 */

export interface ReminderInjection {
  shadows?: string[];
}

export const REMINDER_REGISTRY: ReminderInjection[] = [
  {
    shadows: [
      'system-reminder-file-modification-detected-budget-exceeded',
      'system-reminder-file-modified-externally',
    ],
  },
  { shadows: ['system-reminder-task-tools-reminder'] },
];
