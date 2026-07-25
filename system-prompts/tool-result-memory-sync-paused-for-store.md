<!--
name: 'Tool Result: Memory sync paused for store'
description: >-
  Warns that sync is paused for one memory store, so affected writes are not
  persisted and will be lost when the machine is recycled.
ccVersion: 2.1.219
variables:
  - MEMORY_STORE_NAME
  - PAUSE_REASON
-->
Memory sync is paused for one of your memory stores (${MEMORY_STORE_NAME}): ${PAUSE_REASON} Affected memory writes are NOT being persisted to shared memory and will be lost when this session's machine is recycled.
