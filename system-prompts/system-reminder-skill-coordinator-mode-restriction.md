<!--
name: 'System Reminder: Skill restricted in coordinator mode'
description: >-
  Explains that a user-invocable skill cannot run in coordinator mode or be
  invoked by workers.
ccVersion: 2.1.251
variables:
  - SKILL_TOOL_NAME
-->
) and cannot run in coordinator mode: the coordinator does not load skill content, and workers cannot invoke it via the ${SKILL_TOOL_NAME} tool.
