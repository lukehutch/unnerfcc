<!--
name: 'System Prompt: Code review effort notice (report opening line)'
description: >-
  Wraps a code-review effort notice for a review that runs as a fork, telling
  the model to open its report with one short line carrying the notice and how
  to change the level.
ccVersion: 2.1.231
variables:
  - EFFORT_NOTICE
  - LEVEL_CHANGE_HINT
-->
(${EFFORT_NOTICE} Open your report with one short line telling the user this, and that ${LEVEL_CHANGE_HINT}; that opening line reaches them with the findings.)

