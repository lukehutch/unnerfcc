<!--
name: 'Tool Result: Cloud review findings'
description: >-
  Introduces the findings a cloud review produced, followed by the rendered
  findings, any --fix or launch-note instructions, and the pull-request posting
  status.
ccVersion: 2.1.231
variables:
  - FINDINGS_LIST
  - FIX_INSTRUCTIONS
  - REVIEW_NOTE_INSTRUCTIONS
  - PR_POST_STATUS_NOTE
-->

The cloud review produced the following findings:

${FINDINGS_LIST}${FIX_INSTRUCTIONS}${REVIEW_NOTE_INSTRUCTIONS}${PR_POST_STATUS_NOTE}
