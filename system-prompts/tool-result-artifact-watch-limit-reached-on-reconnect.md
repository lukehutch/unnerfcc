<!--
name: 'Tool Result: Artifact watch limit reached on reconnect'
description: >-
  Tells the model a watch could not reconnect because the session was already
  holding its maximum artifact watches and none of the others could make room.
ccVersion: 2.1.231
variables:
  - MAX_ARTIFACT_WATCHES
-->
Live subscription: skipped — this session was already holding its maximum of ${MAX_ARTIFACT_WATCHES} artifact watches when this one tried to reconnect, and none of the other watches could make room.
