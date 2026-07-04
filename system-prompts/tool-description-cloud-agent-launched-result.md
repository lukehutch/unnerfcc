<!--
name: 'Tool Result: Cloud Agent Launched'
description: >-
  tool_result reporting a launched cloud agent with
  taskId/session_url/output_file and guidance to briefly tell the user and end
  the response.
ccVersion: 2.1.199
variables:
  - TOOL_DESCRIPTION_CLOUD_AGENT_LAUNCHED_RESULT_VAR_0
-->
Cloud agent launched. (This tool result is internal metadata — never quote or paste any part of it, including the ID below, into a user-facing reply.)
taskId: ${TOOL_DESCRIPTION_CLOUD_AGENT_LAUNCHED_RESULT_VAR_0.taskId}
session_url: ${TOOL_DESCRIPTION_CLOUD_AGENT_LAUNCHED_RESULT_VAR_0.sessionUrl}
output_file: ${TOOL_DESCRIPTION_CLOUD_AGENT_LAUNCHED_RESULT_VAR_0.outputFile}
The agent is running in the cloud. You will be notified automatically when it completes.
In your own words, tell the user what you launched and why — what the agent is investigating or building and what you expect to learn back — do not echo this tool result — and end your response.
