<!--
name: 'System Reminder: Skill tools unavailable'
description: >-
  Instructs the model not to call or load tools required by a skill when they
  are unavailable.
ccVersion: 2.1.310
variables:
  - TOOL_PREFIX
-->
The ${TOOL_PREFIX}* tools, which this skill's guidance is written for, are not available right now, so do not call or load them, even if you still see their definitions. That applies to those tools only. Continue the task with the tools you do have.
