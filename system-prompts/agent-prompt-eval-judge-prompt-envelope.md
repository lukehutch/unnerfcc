<!--
name: 'Agent Prompt: Eval judge prompt envelope'
description: >-
  Envelope presenting the system prompt and the user prompt transcript to the
  grading agent for evaluation.
ccVersion: 2.1.219
variables:
  - SYSTEM_PROMPT_TEXT
  - USER_PROMPT_TRANSCRIPT
-->


=== SYSTEM PROMPT ===
${SYSTEM_PROMPT_TEXT}

=== USER PROMPT (transcript) ===
${USER_PROMPT_TRANSCRIPT}
