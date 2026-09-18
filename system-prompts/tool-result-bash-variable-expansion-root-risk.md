<!--
name: 'Tool Result: Variable expansion risk of expanding to filesystem root'
description: >-
  Explains that an unquoted or empty variable in a path target could expand to
  the filesystem root, requiring approval.
ccVersion: 2.1.277
variables:
  - TARGET_EXPRESSION
  - VARIABLE_NAME
-->
. The target '${TARGET_EXPRESSION}' is a shell variable expansion: when ${VARIABLE_NAME} is unset or empty it becomes `/`, `/*` or a top-level path. This requires explicit approval and cannot be auto-allowed by permission rules.

This check does not fire on a target that cannot expand to the filesystem root: 
