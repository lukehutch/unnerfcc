<!--
name: 'Task Notification: Forked session source note'
description: >-
  Injected task notification telling the model this session is a fork of another
  session that is still running, that history up to the fork point is shared,
  and how to find that session and message it to coordinate.
ccVersion: 2.1.257
variables:
  - TASK_NOTIFICATION_TAG
  - SOURCE_SESSION_DESCRIPTION
  - FORK_POINT
  - FIND_SESSION_INSTRUCTION
  - MESSAGE_TOOL_NAME
-->

<${TASK_NOTIFICATION_TAG}>
This session began as a fork (copy) of another session that is still running: ${SOURCE_SESSION_DESCRIPTION}. The conversation up to ${FORK_POINT} is shared history with it; the two sessions have since diverged, and neither sees the other's new activity. To coordinate with it — hand results back, ask what it has done since, avoid duplicating its work — ${FIND_SESSION_INSTRUCTION} and message it with ${MESSAGE_TOOL_NAME}.
</${TASK_NOTIFICATION_TAG}>
