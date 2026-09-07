<!--
name: 'Tool Result: Agent resumed by another agent'
description: >-
  Notifies that a subagent was resumed by another agent and will no longer
  deliver completion results to this session.
ccVersion: 2.1.263
variables:
  - AGENT_NAME
-->
Agent "${AGENT_NAME}" was resumed by another agent and now reports to it; its completion will not be delivered here.
