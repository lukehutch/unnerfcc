<!--
name: 'Task Notification: Receipt may arrive after auto-replies resumed'
description: >-
  Clause telling the model this receipt reaches it on a later turn, and that a
  turn which is the user's own typed message has already resumed auto-replies.
ccVersion: 2.1.310
variables:
  - AUTO_REPLIES_TARGET
  - RESUME_CONDITION_NOTE
  - ARTIFACT_NAME
  - EXTRA_PUBLISH_NOTE
  - UNPROMPTED_NOTE
  - COMMENT_TIMING_NOTE
  - STOP_NOTE
-->
this receipt reaches you with a later turn: if that turn is the user's own typed message it has already resumed ${AUTO_REPLIES_TARGET}${RESUME_CONDITION_NOTE}, otherwise the user's next message resumes ${AUTO_REPLIES_TARGET} (so does a publish of ${ARTIFACT_NAME} the user asks for${EXTRA_PUBLISH_NOTE}; ${UNPROMPTED_NOTE})${COMMENT_TIMING_NOTE}; ${STOP_NOTE}
