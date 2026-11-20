<!--
name: 'Tool Result: Agent stopped on container restart details'
description: >-
  Prefix introducing details for an agent that stopped on container restart
  without being resumed.
ccVersion: 2.1.329
variables:
  - AGENT_ID
  - FAILURE_REASON
-->
Agent ${AGENT_ID} stopped when the container was restarted and was not resumed: ${FAILURE_REASON}
