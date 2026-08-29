<!--
name: 'System Reminder: Concurrent sessions comment reply duplicate warning'
description: >-
  Warns of duplicate replies if multiple live sessions are replying to comments
  on the artifact and tells the user how to resolve via /tasks.
ccVersion: 2.1.251
variables:
  - ARTIFACT_ID
-->
Another live session of this same conversation is running. If it is also replying to comments on ${ARTIFACT_ID}, every comment will get a reply from both sessions until one stops. Tell the user; they can end either session's live-updates task in /tasks. Do not stop a watch on your own.
