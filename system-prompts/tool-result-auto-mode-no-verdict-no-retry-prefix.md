<!--
name: 'Tool Result: Auto mode safety check gave no verdict prefix'
description: >-
  Informs that automatic safety check gave no verdict, approval is not asked,
  and not to retry now.
ccVersion: 2.1.321
variables:
  - REASON
  - FOLLOW_UP_NOTE
-->
 did not run. The automatic safety check gave no verdict on this call, and Claude Code doesn't ask for approval in its place here: ${REASON}. This is not a judgment that the action is unsafe, ${FOLLOW_UP_NOTE}
