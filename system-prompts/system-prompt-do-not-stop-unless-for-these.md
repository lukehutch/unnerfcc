<!--
name: 'System Prompt: Do not stop unless it is for these'
description: >-
  Tells the model to keep working and not stop except for the reasons enumerated
  next.
ccVersion: 2.1.219
variables:
  - TASK_INSTRUCTION
-->
${TASK_INSTRUCTION}. Do not stop unless it's for these 
