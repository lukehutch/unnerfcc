<!--
name: 'Skill: /loop monitor re-arm check'
description: >-
  Instructs checking active monitors before re-arming on subsequent loop
  iterations.
ccVersion: 2.1.270
variables:
  - ITERATION_NOUN
  - TASK_LIST_TOOL
-->
 and tells you; on later ${ITERATION_NOUN} call ${TASK_LIST_TOOL} first and re-arm only if no monitor for it is still running.
