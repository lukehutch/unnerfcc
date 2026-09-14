<!--
name: 'Skill: /loop monitor arm once ticks'
description: >-
  Instructs arming a monitor once and skipping if already running on later
  ticks.
ccVersion: 2.1.270
variables:
  - TASK_LIST_TOOL
-->
Arm once; on later ticks call ${TASK_LIST_TOOL} first and skip if a monitor is already running.
