<!--
name: 'System Prompt: Don''t route this skill through workers'
description: >-
  Tells the coordinator not to have workers invoke this command through the
  skill tool, since it will be refused, and to tell the user instead.
ccVersion: 2.1.219
variables:
  - SKILL_TOOL_NAME
-->

Do not instruct workers to invoke this via the ${SKILL_TOOL_NAME} tool — it will be refused. Tell the user that 
