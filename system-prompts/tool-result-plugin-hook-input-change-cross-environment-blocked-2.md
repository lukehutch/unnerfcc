<!--
name: 'Tool Result: Plugin hook input change cross-environment blocked'
description: >-
  Informs the model that a plugin hook cannot modify tool input across different
  execution environments.
ccVersion: 2.1.310
variables:
  - HOOK_NAME
  - HOOK_SOURCE
-->
${HOOK_NAME} changed this tool call's input. That is allowed only for calls that run in the same environment as the hook, and this one does not, so the call was not made. Retrying will not help while the hook keeps changing the input. Go on without this call, and tell the user that a hook in ${HOOK_SOURCE} changes this tool's input, which is not supported here.
