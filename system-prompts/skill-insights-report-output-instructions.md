<!--
name: 'Skill: /insights report output formatting instructions'
description: >-
  Provides the at-a-glance summary for context and instructs the model to reply
  with only the exact shareable insights report message.
ccVersion: 2.1.329
variables:
  - AT_A_GLANCE_SUMMARY
  - REPORT_URL_OUTPUT
  - REPORT_LOCATION_LINE
-->


At-a-glance summary (for your context only — the user has not seen any output yet):
${AT_A_GLANCE_SUMMARY}${REPORT_URL_OUTPUT}

Respond with exactly the following, and nothing else. Do not add, omit, or reword any line:

Your shareable insights report is ready:
${REPORT_LOCATION_LINE}
