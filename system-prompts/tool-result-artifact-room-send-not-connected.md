<!--
name: 'Tool Result: Artifact room_send not connected'
description: >-
  Explains that room_send failed because the session is not in the room,
  advising to publish with capabilities.room.
ccVersion: 2.1.251
variables:
  - ARTIFACT_URL
-->
Not sent (not_connected): this session is not in the room of ${ARTIFACT_URL} — publish it in this session with capabilities.room to join.
