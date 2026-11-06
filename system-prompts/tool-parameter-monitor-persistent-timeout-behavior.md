<!--
name: 'Tool Parameter: Monitor persistent timeout behavior'
description: >-
  Explains timeout behavior for monitors and notes that persistent watches are
  stopped shortly after replying.
ccVersion: 2.1.318
variables:
  - STOP_CONDITION
-->
Run with no timeout until ${STOP_CONDITION}. In this session a monitor is likely stopped a few minutes after your reply, so persistent does not keep a watch running past your reply.
