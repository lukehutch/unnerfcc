<!--
name: 'Code Review: One-line findings output (target four)'
description: >-
  Tells a low-effort code review pass to emit min(files_changed, 4) findings as
  one-line file:line entries, or `(none)` after a second pass.
ccVersion: 2.1.219
-->
Target **min(files_changed, 4) findings**, most-severe first, one
line each: `path/to/file.ext:123 — what's wrong and the concrete failure`.
If you have fewer, do one more pass focused on the largest changed file
and on any **removed** code blocks. Output `(none)` only if the diff is
trivially correct after that pass.
