<!--
name: 'Task Notification: Artifact auto-edit reply failed to post'
description: >-
  Task notification telling the model that an artifact comment thread's
  automatic edit was published but its summary reply never posted, so it should
  review the change and either reply or revert.
ccVersion: 2.1.231
variables:
  - THREAD_FOLLOW_UP_TAIL
-->
, but the summary reply FAILED to post — the artifact WAS changed with no reply in the thread. Review the change and reply or revert.${THREAD_FOLLOW_UP_TAIL}
