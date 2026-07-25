<!--
name: 'Agent Prompt: Shell command classifier'
description: >-
  Opening of the classifier prompt that processes the shell commands an AI
  coding agent wants to run, followed by the classification instructions.
ccVersion: 2.1.219
variables:
  - SHELL_KIND
  - CLASSIFICATION_INSTRUCTIONS
-->
Your task is to process ${SHELL_KIND} commands that an AI coding agent wants to run.

${CLASSIFICATION_INSTRUCTIONS}
