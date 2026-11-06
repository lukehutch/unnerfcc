<!--
name: 'Tool Result: Auto mode reissue call instruction'
description: >-
  Instructs reissuing a tool call exactly as recorded so auto mode can review
  it.
ccVersion: 2.1.318
variables:
  - TOOL_NAME
  - FALLBACK_INSTRUCTION
-->
Issue the ${TOOL_NAME} call once more exactly as this conversation records it so auto mode reviews it. If it is denied again, do not retry; ${FALLBACK_INSTRUCTION}
