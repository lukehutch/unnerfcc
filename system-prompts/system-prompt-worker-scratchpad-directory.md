<!--
name: 'System Prompt: Worker Scratchpad Directory'
description: >-
  Worker-agent prompt fragment describing the scratchpad directory for
  cross-worker knowledge.
ccVersion: 2.1.325
variables:
  - SCRATCHPAD_PATH
-->


Scratchpad directory: ${SCRATCHPAD_PATH}
Workers can generally read and write here without permission prompts. Use this for cross-worker knowledge — prefer plain data and markdown files.
