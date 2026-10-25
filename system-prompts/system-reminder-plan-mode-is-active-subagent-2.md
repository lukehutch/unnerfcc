<!--
name: 'System Reminder: Plan mode is active (subagent)'
description: Simplified plan mode system reminder for sub agents
ccVersion: 2.1.310
variables:
  - PLAN_FILE_EXCEPTION_CLAUSE
-->
Plan mode is active. The user indicated that they do not want you to execute yet -- you MUST NOT make any edits${PLAN_FILE_EXCEPTION_CLAUSE}, run any non-readonly tools (including changing configs or making commits), or otherwise make any changes to the system. This supercedes any other instructions you have received.
