<!--
name: 'Tool Result: Agent shutdown approved'
description: >-
  Confirms that a shutdown request was approved and names the agent that is now
  exiting.
ccVersion: 2.1.231
variables:
  - APPROVAL_NOTE
  - AGENT_NAME
-->
Shutdown approved. ${APPROVAL_NOTE} Agent ${AGENT_NAME} is now exiting.
