<!--
name: 'Tool Result: Duplicate call prevented'
description: >-
  Informs the model that an identical tool call is already underway and to
  inspect results before retrying.
ccVersion: 2.1.318
variables:
  - TOOL_NAME
-->
${TOOL_NAME} was not run again: this very call was already started here once. It may have finished, failed or been cut off: check what it did before you send a new call.
