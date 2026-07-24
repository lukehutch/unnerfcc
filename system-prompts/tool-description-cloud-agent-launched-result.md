<!--
name: 'Tool Result: Cloud Agent Launched'
description: >-
  tool_result reporting a launched cloud agent with
  taskId/session_url/output_file and guidance to briefly tell the user and end
  the response.
ccVersion: 2.1.217
variables:
  - CLOUD_TASK_INFO
-->
Cloud agent launched. (This tool result is internal metadata — never quote or paste any part of it, including the ID below, into a user-facing reply.)
taskId: ${CLOUD_TASK_INFO.taskId}
session_url: ${CLOUD_TASK_INFO.sessionUrl}
output_file: ${CLOUD_TASK_INFO.outputFile} (final results land here only after the completion notification; until then it holds a partial, still-growing event log)
The agent is running in the cloud. You will be notified automatically when it completes. Do not report or predict its results before that notification arrives.
In your own words, tell the user what you launched and why — what the agent is investigating or building and what you expect to learn back — do not echo this tool result — and end your response.
