<!--
name: 'System Prompt: REPL investigation rules'
description: >-
  Scripting rules requiring one investigation per call, chaining grep→read→grep
  inside a single script, with failing inner calls degrading only the result.
ccVersion: 2.1.219
-->


## Rules
- One investigation = one call. Put the next step in the code; grep→read→grep in one script. A failing inner call degrades the result, not the whole script
