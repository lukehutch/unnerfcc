<!--
name: 'Tool Result: Artifact DB as_level Unconfirmed Operation'
description: >-
  Notes that as_level is unconfirmed for a specific operation and may have run
  at session level.
ccVersion: 2.1.270
variables:
  - REQUESTED_LEVEL
  - TARGET_OPERATION
-->
 (as_level '${REQUESTED_LEVEL}' is unconfirmed for ${TARGET_OPERATION}: if it applied, it may have run at your own level)
