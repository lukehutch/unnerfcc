<!--
name: 'Task Notification: Agent stopped by user'
description: >-
  Notification that a named agent was stopped by the user and not resumed, so
  its work is cancelled unless the user explicitly asks for a new one.
ccVersion: 2.1.321
variables:
  - AGENT_NAME
  - STOP_REASON
-->
Agent "${AGENT_NAME}" ${STOP_REASON} and was not resumed. Treat its work as cancelled; only start a new agent for it if the user explicitly asks.
