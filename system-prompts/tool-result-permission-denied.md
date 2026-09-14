<!--
name: 'Tool Result: Permission denied'
description: >-
  Reports that permission to use a tool was denied by a specified authority or
  rule.
ccVersion: 2.1.270
variables:
  - TOOL_NAME
  - DENY_AUTHORITY
  - DENIAL_DETAILS
-->
Permission to use ${TOOL_NAME} denied by ${DENY_AUTHORITY}${DENIAL_DETAILS}
