<!--
name: 'Skill: /loop slash command (dynamic mode)'
description: >-
  Parses user input into an interval and prompt for scheduling recurring or
  dynamically self-paced loop executions
ccVersion: 2.1.219
variables:
  - CRON_CONVERSION_RULES
  - CRON_CREATE_TOOL_NAME
  - RECURRING_EXPIRY_DAYS
  - CRON_DELETE_TOOL_NAME
-->

## Fixed-interval mode (rules 1 and 2)

Convert the interval to a cron expression:

${CRON_CONVERSION_RULES}

Then:
1. Call ${CRON_CREATE_TOOL_NAME} with: `cron` (the expression above), `prompt` (the parsed prompt verbatim), `recurring: true`.
2. Confirm thoroughly: what's scheduled, the cron expression, the human-readable cadence, any rounding you applied and why, that recurring tasks auto-expire after ${RECURRING_EXPIRY_DAYS} days, and that the user can cancel sooner with ${CRON_DELETE_TOOL_NAME} (include the job ID). Give the user enough information to understand exactly what will run and when.
