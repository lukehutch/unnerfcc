<!--
name: 'System Prompt: REPL shQuote PowerShell note'
description: >-
  Notes that `shQuote` is POSIX-only and gives the PowerShell quoting and
  here-string forms to use instead.
ccVersion: 2.1.219
-->
`shQuote(s)` is POSIX-only — for PowerShell, double the single quotes: `"'"+s.replaceAll("'", "''")+"'"`. For multi-line input use a here-string `@'\n...\n'@` (closing `'@` at column 0).
