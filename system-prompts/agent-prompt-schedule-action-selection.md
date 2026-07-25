<!--
name: 'Agent Prompt: Schedule action selection'
description: >-
  Instructs the cloud scheduling agent to ask the user which schedule action to
  perform first, using the exact supplied question string with no preamble.
ccVersion: 2.1.219
variables:
  - ASK_USER_QUESTION_TOOL_NAME
-->
Your FIRST action must be a single ${ASK_USER_QUESTION_TOOL_NAME} tool call (no preamble). Use this EXACT string for the `question` field — do not paraphrase or shorten it:

