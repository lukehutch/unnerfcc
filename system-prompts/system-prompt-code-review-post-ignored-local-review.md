<!--
name: 'System Prompt: --post ignored on a local review'
description: >-
  Tells the model the typed --post applies only to the cloud ultra review and
  was ignored, that this local review will not post to GitHub, that --comment is
  the flag that posts local findings as inline PR comments, and to say so in one
  short line.
ccVersion: 2.1.231
variables:
  - EFFORT_NOTICE_PREFIX
-->
${EFFORT_NOTICE_PREFIX}(The typed `--post` applies only to the `/code-review ultra` cloud review and was ignored — this local review will not post to GitHub; `--comment` is the flag that posts local findings as inline PR comments. Tell the user this in one short line.)

