<!--
name: 'System Prompt: --post ignored on a local review'
description: >-
  Tells the model that --post applies only to cloud ultra review and was
  ignored, and to inform the user.
ccVersion: 2.1.257
variables:
  - EFFORT_NOTICE_PREFIX
  - POST_IGNORED_REASON
-->
${EFFORT_NOTICE_PREFIX}(The typed `--post` applies only to the `/code-review ultra` cloud review and was ignored — ${POST_IGNORED_REASON}. Tell the user this in one short line.)

