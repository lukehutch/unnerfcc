<!--
name: 'System Reminder: Agent restarted by another agent'
description: >-
  Notifies the model that a stopped agent is working again because another agent
  sent it a message.
ccVersion: 2.1.329
variables:
  - TARGET_AGENT_NAME
  - SENDER_AGENT_ID
-->
Agent "${TARGET_AGENT_NAME}" is working again: another agent (${SENDER_AGENT_ID}) sent it a message after it had stopped
