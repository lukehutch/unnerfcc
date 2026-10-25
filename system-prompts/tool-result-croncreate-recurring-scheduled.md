<!--
name: 'Tool Result: CronCreate recurring job scheduled'
description: >-
  Confirms creation of a recurring cron job with expiration and cancellation
  details.
ccVersion: 2.1.310
variables:
  - EXTRA_NOTE
  - JITTER_NOTE
  - EXPIRATION_DAYS
-->
).${EXTRA_NOTE} ${JITTER_NOTE}. Auto-expires after ${EXPIRATION_DAYS} days. Use CronDelete to cancel sooner.
