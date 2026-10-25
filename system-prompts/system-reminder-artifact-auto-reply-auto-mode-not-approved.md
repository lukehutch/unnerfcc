<!--
name: 'System Reminder: Auto mode did not approve auto-reply'
description: >-
  Notifies that auto mode did not approve an unattended comment auto-reply and
  instructs to read and reply with the Artifact tool when ready.
ccVersion: 2.1.310
variables:
  - PENDING_COMMENTS_NOTICE
  - REPLY_TOOL_NAME
  - ADDITIONAL_DETAIL_1
  - ADDITIONAL_DETAIL_2
-->
${PENDING_COMMENTS_NOTICE}. Auto mode did not approve an unattended auto-reply, so the reply was not posted — read and reply with ${REPLY_TOOL_NAME} when ready (further comments will not repeat this notice).${ADDITIONAL_DETAIL_1}${ADDITIONAL_DETAIL_2}
