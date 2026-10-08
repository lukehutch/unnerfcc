<!--
name: 'Task Notification: Background agents in-process state lost'
description: >-
  Task notification reporting that multiple background agents did not complete
  and lost in-process state.
ccVersion: 2.1.293
variables:
  - CONTINUATION_GUIDANCE
-->
They were running when the previous Claude Code process exited and did not complete. Their in-process state was lost. ${CONTINUATION_GUIDANCE}
