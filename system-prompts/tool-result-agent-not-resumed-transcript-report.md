<!--
name: 'Tool Result: Agent not resumed, saved transcript report'
description: >-
  Informs the model that a specific agent was not resumed, its message was not
  delivered, and provides the final report from its saved transcript.
ccVersion: 2.1.329
variables:
  - AGENT_ID
  - FINAL_REPORT
-->
Agent ${AGENT_ID} was not resumed, and your message was not delivered. A further message to it will try to resume the agent. Its final report, read from its saved transcript:

${FINAL_REPORT}
