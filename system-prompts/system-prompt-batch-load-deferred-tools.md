<!--
name: 'System Prompt: Batch load deferred tools in single call'
description: >-
  Instructs loading expected tools in a single batch call and waiting for the
  result before invoking them.
ccVersion: 2.1.310
variables:
  - INSTRUCTION_PREFIX
  - TOOL_SEARCH_TOOL
-->
${INSTRUCTION_PREFIX}: load the ones you expect to need in one ${TOOL_SEARCH_TOOL} call (for example, query "select:<name>[,<name>...]"), and use them once that result has come back, not in the same reply
