<!--
name: 'Agent Prompt: Artifact type missing brief guidance'
description: >-
  Instructs the agent to ask the user for clarification when no brief was
  provided.
ccVersion: 2.1.270
variables:
  - PROMPT_QUESTION
-->
No brief was given — ask the user ${PROMPT_QUESTION} before creating anything.
