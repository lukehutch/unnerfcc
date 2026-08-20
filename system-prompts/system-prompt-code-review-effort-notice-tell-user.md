<!--
name: 'System Prompt: Code review effort notice (tell the user at the start)'
description: >-
  Wraps a code-review effort notice, telling the model to state it in one short
  line as the review begins, including how to change the level.
ccVersion: 2.1.231
variables:
  - EFFORT_NOTICE
  - LEVEL_CHANGE_HINT
-->
(${EFFORT_NOTICE} Tell the user this in one short line as you begin, including that ${LEVEL_CHANGE_HINT}.)

