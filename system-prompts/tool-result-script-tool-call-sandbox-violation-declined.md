<!--
name: 'Tool Result: Script tool call sandbox violation rerun declined'
description: >-
  Reports that a tool call encountered a sandbox violation and the user declined
  running it unconfined.
ccVersion: 2.1.318
variables:
  - TOOL_CALL_IDENTIFIER
-->
${TOOL_CALL_IDENTIFIER} ran once in the sandbox, which reported a violation. The user declined to run it again outside the sandbox.
