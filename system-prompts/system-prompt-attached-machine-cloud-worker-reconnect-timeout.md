<!--
name: 'System Prompt: Cloud worker reconnect timeout'
description: >-
  Informs the model that an attached machine failed to reconnect within timeout
  after cloud worker replacement.
ccVersion: 2.1.321
variables:
  - MACHINE_NAME
  - TIMEOUT_SECONDS
  - PREFIX_TEXT
-->
. This session's cloud worker was replaced, and the Claude Code on ${MACHINE_NAME} did not connect to the new one within ${TIMEOUT_SECONDS} s. Do not do the work of ${MACHINE_NAME} here in this session's own environment, and do not report it as done: ${PREFIX_TEXT}tell the user that it has not reconnected, and carry on only with work that does not need it. If it reconnects, its tools appear here again.
