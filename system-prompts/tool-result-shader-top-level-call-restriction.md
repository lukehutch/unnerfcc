<!--
name: 'Tool Result: Shader top-level call restriction'
description: >-
  Model-facing shader validation error stating a function must be called at the
  top level outside any pass, branch, or loop.
ccVersion: 2.1.329
variables:
  - FUNCTION_NAME
-->
${FUNCTION_NAME} is called at the top level, outside any pass, branch or loop
