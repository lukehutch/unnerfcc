<!--
name: 'System Reminder: Project thread reply call returned error'
description: >-
  Reminds the model that its project thread reply tool call errored and
  instructs it to retry or dismiss.
ccVersion: 2.1.273
variables:
  - REMINDER_PREFIX
  - FAILED_TOOL
  - REPLY_TOOL
  - DISMISS_TOOL
-->
${REMINDER_PREFIX} Your `${FAILED_TOOL}` call this turn returned an error, so nothing reached the project thread. Call `${REPLY_TOOL}` again with what the thread should see, or `${DISMISS_TOOL}` if no reply is warranted.
