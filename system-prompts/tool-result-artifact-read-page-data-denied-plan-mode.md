<!--
name: 'Tool Result: Page-data read denied in plan mode'
description: >-
  Denial telling the model a page-data read from plan mode needs a consent
  surface nobody can answer in this session, so it should keep planning in the
  plan file and raise open choices in chat instead of retrying.
ccVersion: 2.1.222
-->
Page-data reads from plan mode need a consent surface, and no one can answer the prompt in this session. Keep planning in the plan file and raise open choices with the user in chat; do not retry this read in this session.
