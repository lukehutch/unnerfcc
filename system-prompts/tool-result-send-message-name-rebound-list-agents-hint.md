<!--
name: 'Tool Result: Use the agent listing to reach the earlier session'
description: >-
  Points the model at the agent-listing tool when a name has rebound to a
  different agent and the earlier session is still wanted.
ccVersion: 2.1.231
variables:
  - LIST_AGENTS_TOOL_NAME
-->
 Use ${LIST_AGENTS_TOOL_NAME} if you still need that session.
