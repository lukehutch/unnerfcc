<!--
name: 'Tool Result: Agent not resumed, saved transcript report'
description: >-
  Informs the model that a specific agent was not resumed, its message was not
  delivered, and provides the final report from its saved transcript.
ccVersion: 2.1.325
variables:
  - AGENT_ID
  - FINAL_REPORT
-->
Agent ${AGENT_ID} was not resumed, and your message was not delivered. It can still be resumed. Its final report, read from its saved transcript:

${FINAL_REPORT}
