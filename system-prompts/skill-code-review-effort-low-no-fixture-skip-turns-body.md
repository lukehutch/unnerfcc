<!--
name: 'Skill: Code Review low effort turns body (no fixture skip)'
description: >-
  Two-turn workflow for low-effort code review reading the diff without skipping
  test fixtures.
ccVersion: 2.1.292
-->
`

## Turn 1 — read

Read the unified diff (`git diff @{upstream}...HEAD; git diff HEAD` to cover
both committed and uncommitted changes, or `git diff main...HEAD` / the target
passed as an argument), and read full files or spawn subagents when surrounding
context is needed to verify a bug.

## Turn 2 — findings

Flag runtime-correctness bugs: inverted/wrong condition, off-by-one,
null/undefined deref where the value can be absent, removed guard, falsy-zero
check, missing `await`, wrong-variable copy-paste, error swallowed in a catch
that should propagate. Also flag new code that duplicates an existing helper,
and dead code the diff leaves behind.

Focus on runtime correctness and real defects; include performance issues, missing tests, or context outside the hunk when they reveal a genuine problem, and skip pure style or naming nitpicks unless they obscure intent.

