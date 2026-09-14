<!--
name: 'Tool Parameter: Monitor timeout deadline'
description: >-
  Parameter description for monitor deadline duration with default and capping
  values.
ccVersion: 2.1.270
variables:
  - DEFAULT_TIMEOUT_MS
  - MAX_TIMEOUT_MS
-->
Kill the monitor after this deadline. Default ${DEFAULT_TIMEOUT_MS}ms. Deadlines above ${MAX_TIMEOUT_MS}ms are capped to ${MAX_TIMEOUT_MS}ms. You are notified at expiry and can re-arm.
