<!--
name: 'System Reminder: Scheduled wakeup missed after process ended'
description: >-
  Informs the model that a scheduled wakeup expired before the session was
  resumed and advises rescheduling if still wanted.
ccVersion: 2.1.310
variables:
  - TAG_NAME
  - SCHEDULE_WAKEUP_TOOL
-->

<${TAG_NAME}>The wakeup scheduled by the ${SCHEDULE_WAKEUP_TOOL} call this notification names was still pending when this session's process ended, and its fire time passed before a new process took the session over. It will not fire. A ${SCHEDULE_WAKEUP_TOOL} call made since the new process started is not affected. Otherwise nothing wakes this session for the loop: call ${SCHEDULE_WAKEUP_TOOL} again only if the loop is still wanted, and when the conversation does not make that clear, ask the user first.</${TAG_NAME}>
