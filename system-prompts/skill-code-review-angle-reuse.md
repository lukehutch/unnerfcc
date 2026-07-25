<!--
name: 'Skill: Code review angle — reuse'
description: >-
  Cleanup review angle telling the finder to flag new code that re-implements an
  existing helper and to name the helper that should be called instead.
ccVersion: 2.1.219
-->
### Reuse

The angles above hunt for bugs; this one and the next two hunt for cleanup in
the changed code. Flag new code that re-implements something the codebase
already has — Grep shared/utility modules and files adjacent to the change,
and name the existing helper to call instead.
