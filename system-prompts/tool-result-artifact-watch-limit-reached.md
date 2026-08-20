<!--
name: 'Tool Result: Artifact watch limit reached'
description: >-
  Tells the model the live subscription was skipped because the session already
  holds its maximum artifact watches and none could be displaced, so it must
  unwatch one first.
ccVersion: 2.1.231
variables:
  - MAX_ARTIFACT_WATCHES
-->
Live subscription: skipped — this session already holds its maximum of ${MAX_ARTIFACT_WATCHES} artifact watches and none could make room (each is a watch you requested, one auto-replying to comments, or the artifact you most recently published, or watch slots are still connecting); unwatch one first.
