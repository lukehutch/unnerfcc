<!--
name: 'System Reminder: Auto-reply can only acknowledge'
description: >-
  Tail of the auto-reply notification telling the model the reply did not change
  artifact content so it must make any requested change itself.
ccVersion: 2.1.272
variables:
  - ARTIFACT_URL
-->
 on artifact ${ARTIFACT_URL} — a reply only: it may answer a question, but nothing in the artifact was changed. If the thread asks for a change to the artifact, read the thread and make the change yourself if appropriate.
