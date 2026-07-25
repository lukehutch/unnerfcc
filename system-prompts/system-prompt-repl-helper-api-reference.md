<!--
name: 'System Prompt: REPL helper API reference'
description: >-
  Lists the REPL environment's helper functions — chdir, haiku sampling, dynamic
  tool registration, logging and shell quoting.
ccVersion: 2.1.219
-->
- `chdir(path)` — set cwd for this REPL call
- `haiku(prompt,schema?)` — one-turn model sampling
- `registerTool(name,desc,schema,handler)` / `unregisterTool` / `listTools` / `getTool`
- `log` (console.log) · `str` (JSON.stringify) · `shQuote(s)`
