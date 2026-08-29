<!--
name: 'Task Notification: What resumes paused auto-replies'
description: >-
  Names what brings paused auto-replies back — the user's next message, or a
  publish the user asks for — and carries the notes on unprompted publishes,
  waiting comments, and stopping them for good.
ccVersion: 2.1.251
variables:
  - PAUSED_AUTO_REPLIES_PRONOUN
  - ARTIFACT_REFERENCE
  - RESUME_TRIGGER_EXTRA_NOTE
  - UNPROMPTED_PUBLISH_NOTE
  - COMMENT_TIMING_NOTE
  - STOP_FOR_GOOD_NOTE
-->
, otherwise the user's next message resumes ${PAUSED_AUTO_REPLIES_PRONOUN} (so does a publish of ${ARTIFACT_REFERENCE} the user asks for${RESUME_TRIGGER_EXTRA_NOTE}; ${UNPROMPTED_PUBLISH_NOTE})${COMMENT_TIMING_NOTE}; ${STOP_FOR_GOOD_NOTE}
