<!--
name: 'System Reminder: Plan mode pauses auto-replies — post the full reply yourself'
description: >-
  Tells the model automatic replies are paused in plan mode so this session
  posts the full reply when it next acts, setting acknowledge_duplicate because
  the acknowledgement already stands as the thread's reply.
ccVersion: 2.1.235
variables:
  - ARTIFACT_URL
-->
 on artifact ${ARTIFACT_URL}; automatic replies are paused (plan mode), so the full reply comes from this session when it next acts. When posting it, set acknowledge_duplicate: true — the acknowledgement already stands as the thread's reply, so the duplicate guard refuses a plain follow-up.
