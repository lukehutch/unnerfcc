<!--
name: 'Tool Result: Request invalid permission mode'
description: >-
  States that the field may hold only a permission mode recognized by the target
  host.
ccVersion: 2.1.318
variables:
  - FIELD_NAME
  - TARGET_MACHINE
-->
its field "${FIELD_NAME}" may hold only a permission mode that ${TARGET_MACHINE} knows
