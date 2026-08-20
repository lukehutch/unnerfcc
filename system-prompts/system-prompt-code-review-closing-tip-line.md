<!--
name: 'System Prompt: Code review closing tip line'
description: >-
  Requires the code review to end with the supplied ultrareview tip as the
  response's final standalone line.
ccVersion: 2.1.231
variables:
  - REVIEW_CLOSING_TIP_LINE
-->


After you finish the review, end your response with this exact line on its own:
${REVIEW_CLOSING_TIP_LINE}
