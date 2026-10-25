<!--
name: 'Agent Prompt: Progress label generation template'
description: >-
  Template formatting task notes and completed tools into a prompt for progress
  label generation.
ccVersion: 2.1.310
variables:
  - PROMPT_HEADER
  - TASK_NOTES
  - COMPLETED_TOOLS_LIST
-->
${PROMPT_HEADER}${TASK_NOTES}Tools completed:

${COMPLETED_TOOLS_LIST}

Label:
