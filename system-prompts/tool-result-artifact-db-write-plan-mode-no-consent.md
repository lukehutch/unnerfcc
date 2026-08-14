<!--
name: 'Tool Result: Artifact database write blocked in plan mode'
description: >-
  Tells the model a database write from plan mode has no consent surface in this
  session, so it should keep planning in the plan file, raise the write with the
  user, and not retry it here.
ccVersion: 2.1.231
-->
Database writes from plan mode need a consent surface, and no one can answer the prompt in this session. Keep planning in the plan file and raise the write with the user in chat; do not retry this write in this session.
