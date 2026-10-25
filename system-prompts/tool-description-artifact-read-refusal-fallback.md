<!--
name: 'Tool Description: Artifact read refusal fallback'
description: >-
  Instructs using a fallback tool when a link is refused by the primary artifact
  tool.
ccVersion: 2.1.310
variables:
  - FIRST_TOOL_NAME
  - FALLBACK_TOOL_NAME
-->
for a link ${FIRST_TOOL_NAME} refuses, use ${FALLBACK_TOOL_NAME}.
