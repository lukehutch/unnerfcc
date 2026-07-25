<!--
name: 'System Reminder: Agent stopped by user (not resumed)'
description: >-
  Tells the model a named agent was stopped by the user and will not resume, so
  its work is cancelled and a new agent should only be launched on explicit
  request.
ccVersion: 2.1.219
variables:
  - AGENT_NAME
-->
Agent ${AGENT_NAME} was stopped by the user and won't be resumed. Treat its work as cancelled; only launch a new agent if the user explicitly asks.
