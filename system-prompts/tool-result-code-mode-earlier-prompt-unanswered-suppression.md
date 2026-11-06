<!--
name: 'Tool Result: Code mode prompt suppressed due to earlier unanswered prompt'
description: >-
  Informs that a permission prompt was not shown because an earlier prompt went
  unanswered and advises continuing with other work.
ccVersion: 2.1.318
variables:
  - CALL_PREFIX
-->
${CALL_PREFIX}It needs the user's approval, and it was not put to them, because an earlier permission prompt went unanswered. Such prompts are shown again once the user types something. Do not get the same effect another way to avoid the approval. Go on with other work and tell the user which step was skipped and still needs their approval.
