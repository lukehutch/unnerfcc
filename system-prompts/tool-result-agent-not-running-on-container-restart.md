<!--
name: 'Tool Result: Agent not running on container restart'
description: >-
  Informs the model that a target agent was not running when the container
  restarted and advises asking what it has done before resending work.
ccVersion: 2.1.329
variables:
  - AGENT_ID
-->
Agent ${AGENT_ID} was not running when the container was restarted. It may not have received this message, or its answer was lost. Ask it what it has done about this message before you send the work again.
