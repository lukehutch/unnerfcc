<!--
name: 'Tool Result: REPL synchronous execution and await requirement'
description: >-
  Explains that the script execution tool runs synchronously, requiring awaiting
  all tool calls.
ccVersion: 2.1.318
variables:
  - UNAVAILABLE_TOOL_NAME
  - REPL_TOOL_NAME
-->
. ${UNAVAILABLE_TOOL_NAME} is not among your tools in this session. Each ${REPL_TOOL_NAME} call here waits for its script and returns its output; none returns a (dispatched #N) receipt and no ${REPL_TOOL_NAME} output arrives later. A tool call the script has not awaited when it returns is cancelled and may not finish, so await every tool call. Continue with ${REPL_TOOL_NAME}.
