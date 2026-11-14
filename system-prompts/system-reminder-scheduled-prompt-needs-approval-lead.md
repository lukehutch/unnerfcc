<!--
name: 'System Reminder: Scheduled prompt needs approval lead'
description: >-
  Informs the model that a scheduled prompt has not run yet due to approval
  requirements and names the tool to invoke it.
ccVersion: 2.1.325
variables:
  - SKILL_TOOL_NAME
-->
This scheduled prompt has not run yet, because it may need the user's approval. To run it, call the ${SKILL_TOOL_NAME} tool for 
