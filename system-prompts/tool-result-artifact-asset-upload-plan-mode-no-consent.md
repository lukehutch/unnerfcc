<!--
name: 'Tool Result: Artifact asset upload blocked in plan mode'
description: >-
  Tells the model an asset upload from plan mode has no consent surface in this
  session, so it should keep planning in the plan file, raise the upload with
  the user, and not retry it here.
ccVersion: 2.1.235
-->
Asset uploads from plan mode need a consent surface, and no one can answer the prompt in this session. Keep planning in the plan file and raise the upload with the user in chat; do not retry this upload in this session.
