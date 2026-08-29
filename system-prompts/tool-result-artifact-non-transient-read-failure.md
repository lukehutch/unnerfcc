<!--
name: 'Tool Result: Non-transient Artifact Read Failure'
description: >-
  Explains that a non-transient error occurred while reading the artifact and
  suggests verifying the URL.
ccVersion: 2.1.251
variables:
  - TOOL_CALL_SYNTAX
  - SUFFIX
-->
 isn't transient, so retrying won't help. Check the URL with ${TOOL_CALL_SYNTAX}${SUFFIX}.
