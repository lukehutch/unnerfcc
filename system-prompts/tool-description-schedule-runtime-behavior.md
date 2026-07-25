<!--
name: 'Tool Description: Schedule runtime behavior'
description: >-
  Explains when scheduled jobs actually fire, the jitter applied, and the
  auto-expiry the user must be told about.
ccVersion: 2.1.219
variables:
  - IDLE_FIRING_NOTE
  - RECURRING_EXPIRY_DAYS
  - CANCEL_JOB_TOOL_NAME
-->

## Runtime behavior

Jobs only fire while the REPL is idle (not mid-query). ${IDLE_FIRING_NOTE}The scheduler adds a small deterministic jitter on top of whatever you pick: recurring tasks fire up to 10% of their period late (max 15 min); one-shot tasks landing on :00 or :30 fire up to 90 s early. Picking an off-minute is still the bigger lever.

Recurring tasks auto-expire after ${RECURRING_EXPIRY_DAYS} days — they fire one final time, then are deleted. This bounds session lifetime. Tell the user about the ${RECURRING_EXPIRY_DAYS}-day limit when scheduling recurring jobs.

Returns a job ID you can pass to ${CANCEL_JOB_TOOL_NAME}.
