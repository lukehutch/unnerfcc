<!--
name: 'Tool Result: Auto mode reissue with hook input'
description: >-
  Instructs reissuing a tool call in the next response with the exact
  hook-produced input for auto-mode review.
ccVersion: 2.1.318
variables:
  - TOOL_NAME
  - FALLBACK_INSTRUCTION
-->
. In your next response, issue the ${TOOL_NAME} call once more with exactly that input so auto mode reviews it. Put nothing else in that response but other calls whose denial quoted an input like this one. If it is denied again, do not retry; ${FALLBACK_INSTRUCTION}
