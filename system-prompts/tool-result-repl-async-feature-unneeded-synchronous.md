<!--
name: 'Tool Result: Async polling feature unneeded in synchronous execution'
description: >-
  Explains that polling or async waiting is not needed because execution waits
  synchronously.
ccVersion: 2.1.318
variables:
  - TOOL_NAME
  - CALLING_TOOL_NAME
-->
${TOOL_NAME} isn't available here and isn't needed: each ${CALLING_TOOL_NAME} call you make here waits for its script to finish and returns the result.
