<!--
name: 'Tool Result: Check who is reachable now'
description: >-
  Follows a failed send by pointing the model at the agent-listing tool to see
  which sessions are reachable now.
ccVersion: 2.1.231
variables:
  - LIST_AGENTS_TOOL_NAME
-->
 Call ${LIST_AGENTS_TOOL_NAME} to see who is reachable now.
