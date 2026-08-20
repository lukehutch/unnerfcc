<!--
name: 'Task Notification: Auto-edit reply failed, only the acknowledgement stands'
description: >-
  Branch of the auto-edit task notification whose summary reply failed to post
  while this session's acknowledgement still stands, telling the model to review
  the change and post the promised summary with acknowledge_duplicate true — the
  duplicate guard refuses a plain follow-up — or revert.
ccVersion: 2.1.235
variables:
  - ACKNOWLEDGEMENT_COMMENT_ID
  - THREAD_FOLLOW_UP_TAIL
-->
the artifact WAS changed, and the only reply standing is this session's acknowledgement${ACKNOWLEDGEMENT_COMMENT_ID}. Review the change, then post the promised summary reply with acknowledge_duplicate: true — the duplicate guard refuses a plain follow-up — or revert.${THREAD_FOLLOW_UP_TAIL}
