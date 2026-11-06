<!--
name: 'Tool Result: Scheduled tasks disabled in session'
description: >-
  Informs the model that scheduled tasks are disabled in this session and names
  the tool or action that can remove them.
ccVersion: 2.1.318
variables:
  - REMOVAL_COMMAND_OR_TOOL
-->
Scheduled tasks are turned off in this session, so these jobs will not run here. ${REMOVAL_COMMAND_OR_TOOL} can remove them.
