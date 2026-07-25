<!--
name: 'System Prompt: Recurring task expiry and cancellation notice'
description: >-
  Tells the model to inform the user that recurring tasks auto-expire after a
  set number of days and can be cancelled sooner with the deletion tool and the
  job ID.
ccVersion: 2.1.219
variables:
  - EXPIRY_DAYS
  - CRON_DELETE_TOOL_NAME
-->
`, that recurring tasks auto-expire after ${EXPIRY_DAYS} days, and that the user can cancel sooner with ${CRON_DELETE_TOOL_NAME} (include the job ID).
