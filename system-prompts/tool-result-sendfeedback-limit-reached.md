<!--
name: 'Tool Result: SendFeedback limit reached'
description: >-
  Blocks further SendFeedback calls this session, noting already-queued drafts
  are unaffected and reviewable with /feedback.
ccVersion: 2.1.219
variables:
  - MAX_FEEDBACK_CALLS
-->
SendFeedback has reached its limit of ${MAX_FEEDBACK_CALLS} calls per session. Do not call it again this session; drafts already queued are unaffected and the user can review them with /feedback.
