<!--
name: 'Tool Parameter: Monitor deadline'
description: >-
  Describes the deadline parameter specifying when to terminate the background
  monitor and its default and maximum values.
ccVersion: 2.1.329
variables:
  - DEFAULT_DEADLINE_MS
  - MAX_DEADLINE_MS
-->
Kill the monitor after this deadline. Default ${DEFAULT_DEADLINE_MS}ms. Deadlines above ${MAX_DEADLINE_MS}ms are capped to ${MAX_DEADLINE_MS}ms.
