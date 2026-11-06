<!--
name: 'Tool Result: Agent finished report lost on restart'
description: >-
  Informs that an agent finished before container restart but its report was
  lost, advising messaging the agent to retrieve it.
ccVersion: 2.1.318
variables:
  - AGENT_ID
-->
Agent ${AGENT_ID} had finished when the container was restarted, but its report was lost with the restart. It was not run again. Send it a message to ask for its report.
