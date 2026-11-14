<!--
name: 'Tool Description: TaskCreate usage trigger'
description: >-
  Concise trigger instructing the model to use TaskCreate for multi-step work
  and distinguishing it from subagent delegation.
ccVersion: 2.1.325
variables:
  - AGENT_TOOL_NAME
-->
When you are about to start work that takes three or more steps, or the user has just given several things to do, use it once per task to list them; to hand work to a subagent, use ${AGENT_TOOL_NAME}.
