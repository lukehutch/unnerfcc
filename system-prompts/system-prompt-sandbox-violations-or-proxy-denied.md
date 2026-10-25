<!--
name: 'System Prompt: Sandbox violations or proxy denied condition'
description: >-
  Condition handling denied hosts identified either via sandbox violation blocks
  or proxy errors.
ccVersion: 2.1.310
variables:
  - TOOL_NAME
  - DETERMINATION_CLAUSE
-->
If the `<sandbox_violations>` block names a denied host, or the proxy denied a host that a ${TOOL_NAME} command needs ${DETERMINATION_CLAUSE}
