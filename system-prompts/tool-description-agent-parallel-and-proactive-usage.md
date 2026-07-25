<!--
name: 'Tool Description: Agent (proactive and parallel usage)'
description: >-
  Agent tool usage notes telling the model to use proactively-marked agents
  unprompted and to batch parallel agent launches into one message.
ccVersion: 2.1.219
variables:
  - AGENT_TOOL_NAME
-->

- If the agent description mentions that it should be used proactively, then you should try your best to use it without the user having to ask for it first.
- If the user specifies that they want you to run agents "in parallel", you MUST send a single message with multiple ${AGENT_TOOL_NAME} tool use content blocks. For example, if you need to launch both a build-validator agent and a test-runner agent in parallel, send a single message with both tool calls.
