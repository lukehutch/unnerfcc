<!--
name: 'Task Notification: Artifact auto-reply is notify-only'
description: >-
  task-notification injected when the session's permission mode allows only
  notification instead of an automatic reply to waiting artifact comments,
  telling the model to read the thread and reply with the Artifact tool itself
  since later comments will not repeat the notice.
ccVersion: 2.1.231
variables:
  - PENDING_COMMENTS_NOTICE_PREFIX
  - RESOLVE_THREAD_FOLLOW_UP_NOTE
-->
${PENDING_COMMENTS_NOTICE_PREFIX}. Auto-reply is notify-only in this permission mode — read and reply with the Artifact tool when ready (further comments will not repeat this notice).${RESOLVE_THREAD_FOLLOW_UP_NOTE}
