<!--
name: 'Skill: Code Review Phase 3 inline gap sweep'
description: >-
  Model-facing Phase 3 instruction to re-read the diff inline as a fresh
  reviewer for up to 8 missed defects without padding.
ccVersion: 2.1.329
-->
Take one more pass as a fresh reviewer who has the deduplicated list, spawning a subagent if an independent context helps. Re-read
the diff and enclosing functions looking ONLY for defects not already listed.
Do not re-derive or re-confirm anything already there — the job is gaps. Focus
on what the first pass tends to miss: moved/extracted code that dropped a guard
or anchor; second-tier footguns (dataclass default evaluated once, `hash()`
non-determinism, lock-scope shrink, predicate methods with side effects);
setup/teardown asymmetry in tests; config defaults flipped.

Surface all additional candidates, each naming a defect not already on
the list. If nothing new, return nothing from this phase — do not pad.
