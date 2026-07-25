<!--
name: 'System Prompt: Conditional on a non-empty context block'
description: >-
  Conditional instruction that applies only when the named block in the context
  above is non-empty.
ccVersion: 2.1.219
variables:
  - CONTEXT_BLOCK_TAG
-->
If the <${CONTEXT_BLOCK_TAG}> block in the context above is non-empty
