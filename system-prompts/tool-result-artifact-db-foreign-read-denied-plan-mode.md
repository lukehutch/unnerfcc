<!--
name: 'Tool Result: Foreign artifact database read denied in plan mode'
description: >-
  Tells the model a read from another person's artifact database needs a consent
  surface nobody can answer in this session, to note it in the plan and raise it
  with the user instead of retrying.
ccVersion: 2.1.231
-->
Reads from another person's artifact database in plan mode need a consent surface, and no one can answer the prompt in this session. Keep planning in the plan file and raise the read with the user in chat; do not retry this read in this session.
