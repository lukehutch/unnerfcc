<!--
name: 'System Prompt: Code review reuses the last effort level'
description: >-
  Clause of the /code-review preamble telling the model it is reusing the effort
  level the user typed last time.
ccVersion: 2.1.231
variables:
  - EFFORT_LEVEL
-->
reusing ${EFFORT_LEVEL}, the level the user typed last time
