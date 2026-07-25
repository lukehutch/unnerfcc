<!--
name: 'Tool Result: Cloud review findings'
description: >-
  Introduces the findings a cloud review produced, followed by the rendered
  findings and the follow-up instructions.
ccVersion: 2.1.219
variables:
  - FINDINGS_LIST
  - FINDINGS_SUMMARY
  - FOLLOW_UP_INSTRUCTIONS
-->

The cloud review produced the following findings:

${FINDINGS_LIST}${FINDINGS_SUMMARY}${FOLLOW_UP_INSTRUCTIONS}
