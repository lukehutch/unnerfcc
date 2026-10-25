<!--
name: 'System Prompt: Sandbox denied connections reporting scope'
description: >-
  Notes that denied connections appear in sandbox violation blocks only for
  specific tools and specifies fallback behavior.
ccVersion: 2.1.310
variables:
  - TOOL_NAME
  - ALTERNATIVE_TOOL_GUIDANCE
-->
; denied connections are reported in a `<sandbox_violations>` block explaining the reason, but only in ${TOOL_NAME} results. ${ALTERNATIVE_TOOL_GUIDANCE}
