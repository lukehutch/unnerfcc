<!--
name: 'Tool Description: Schedule runtime behavior'
description: >-
  Explains when scheduled jobs actually fire, the jitter applied, and the
  auto-expiry the user must be told about.
ccVersion: 2.1.310
variables:
  - CRON_STATUS_TOOL
  - RECURRING_EXPIRY_DAYS
  - CRON_CANCEL_TOOL
-->
 s early. The result of this tool and of ${CRON_STATUS_TOOL} gives each job's actual next run time: when you tell the user when a job will run, give that time, not the minute in the cron expression. Picking an off-minute is still the bigger lever.

Recurring tasks auto-expire after ${RECURRING_EXPIRY_DAYS} days — they fire one final time, then are deleted. This bounds session lifetime. Tell the user about the ${RECURRING_EXPIRY_DAYS}-day limit when scheduling recurring jobs.

Returns a job ID you can pass to ${CRON_CANCEL_TOOL}.
