<!--
name: 'System Reminder: Auto-reply can only acknowledge'
description: >-
  Tail of the auto-reply-posted notification telling the model the automatic
  reply only acknowledges, so it must read the thread and make any requested
  artifact change itself.
ccVersion: 2.1.231
variables:
  - ARTIFACT_URL
-->
 on artifact ${ARTIFACT_URL} — an acknowledgement only. If the thread asks for a change to the artifact, read the thread and make the change yourself if appropriate.
