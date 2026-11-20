<!--
name: 'System Reminder: Agent reassigned to resuming agent'
description: >-
  Notifies the model that a waiting agent was resumed by and now reports to
  another agent, so it should not be relaunched or expected to notify here.
ccVersion: 2.1.329
variables:
  - RESUMING_AGENT_ID
-->
", which was waiting on its own background work, was resumed by another agent (${RESUMING_AGENT_ID}) and now reports to that agent. Do not treat its work as cancelled or relaunch it, and do not count on a notification from it here, even after messaging it.
