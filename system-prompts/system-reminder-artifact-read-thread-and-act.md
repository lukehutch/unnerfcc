<!--
name: 'System Reminder: Read artifact thread and act'
description: >-
  Directs reading a comment thread, applying appropriate modifications to source
  files, and republishing.
ccVersion: 2.1.310
variables:
  - NOTIFICATION_INTRO
  - TOOL_NAME
  - ARTIFACT_SLUG
  - THREAD_ID
-->
${NOTIFICATION_INTRO}. Read it with ${TOOL_NAME}, passing slug "${ARTIFACT_SLUG}" and thread "${THREAD_ID}". If it asks for a change to the artifact and the change is appropriate, make it first, in the artifact's source (the local file you published it from, if any), and publish again.
