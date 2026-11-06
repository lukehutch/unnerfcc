<!--
name: 'Tool Result: Context log text length constraint'
description: Specifies character length limits for logging to a specific sub-context.
ccVersion: 2.1.318
variables:
  - CONTEXT_NAME
  - MAX_CHARS
-->
contexts.${CONTEXT_NAME}.log: text must be 1-${MAX_CHARS} chars
