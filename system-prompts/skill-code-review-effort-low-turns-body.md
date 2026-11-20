<!--
name: 'Skill: Code Review low effort turns body'
description: >-
  Two-turn workflow for low-effort code review: reading unified diff and
  flagging hunk-visible bugs.
ccVersion: 2.1.329
-->
...HEAD; git diff HEAD`
to cover both committed and uncommitted changes, or `git diff main...HEAD` /
the target passed as an argument). Include test and fixture hunks, and read full files or spawn subagents when
surrounding context is needed to verify a bug.

## Turn 2 — findings

Flag runtime-correctness bugs: inverted/wrong condition, off-by-one,
null/undefined deref where the value can be absent, removed guard, falsy-zero
check, missing `await`, wrong-variable copy-paste, error swallowed in a catch
that should propagate.
