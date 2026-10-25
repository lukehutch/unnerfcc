<!--
name: 'Tool Result: Claude Test progress call shapes requirement'
description: >-
  Explains the two valid call signatures for the test progress tool: start or
  verdict recording.
ccVersion: 2.1.310
-->
: pass either { run, key, start: true } before the first spec, with stems: ["<stem>", ...] for a run limited to some specs, or { run, key, stem: "<the spec file's name without .md>", verdict: "PASS" | "FAIL" | "BLOCKED" } after a verdict.
