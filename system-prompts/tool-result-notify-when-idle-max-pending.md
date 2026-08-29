<!--
name: 'Tool Result: notify_when_idle max pending subscriptions reached'
description: >-
  Reports that the maximum number of pending idle subscriptions has been
  reached.
ccVersion: 2.1.251
variables:
  - PENDING_COUNT
-->
notify_when_idle: this session already holds ${PENDING_COUNT} pending idle subscriptions — wait for some to fire or expire.
