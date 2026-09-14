<!--
name: 'Skill: /loop monitor arm once iterations'
description: >-
  Instructs arming a monitor once and skipping if already running on later
  iterations.
ccVersion: 2.1.270
variables:
  - TASK_LIST_TOOL
-->
Arm once; on later iterations call ${TASK_LIST_TOOL} first and skip this step if a monitor is already running.
