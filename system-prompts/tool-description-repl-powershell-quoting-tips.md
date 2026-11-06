<!--
name: 'Tool Description: REPL PowerShell quoting tips'
description: >-
  Guidance on PowerShell string escaping and multi-line here-string syntax in
  REPL scripts.
ccVersion: 2.1.318
-->
For PowerShell, quote by doubling single quotes: `"'"+s.replaceAll("'", "''")+"'"`; for multi-line input use a here-string `@'\n...\n'@` (closing `'@` at column 0).
