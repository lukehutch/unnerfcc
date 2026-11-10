<!--
name: 'Tool Result: Auto mode denied switch mode instruction'
description: >-
  Advises not to retry if denied again, continue other tasks, and notify the
  user to switch out of auto mode to approve directly.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
-->
If it is denied again, do not retry; continue with other tasks and tell the user that auto mode could not check this ${TOOL_NAME} call, and that they can switch out of auto mode to approve it themselves.
