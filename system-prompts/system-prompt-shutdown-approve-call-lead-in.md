<!--
name: 'System Prompt: Shutdown approval call lead-in'
description: >-
  Instructs the agent on how to call the tool with JSON message input to approve
  a shutdown request.
ccVersion: 2.1.257
variables:
  - TOOL_NAME
-->
To approve it, call ${TOOL_NAME} with exactly this input, where "message" is a JSON object rather than a string
