<!--
name: 'Tool Result: Output too large and truncated without saving'
description: >-
  Tool result indicating command output exceeded size limits, could not be saved
  to disk, and was truncated to the first portion.
ccVersion: 2.1.325
variables:
  - TOTAL_BYTES
  - SHOWN_BYTES
  - FOLLOW_UP_NOTE
-->
Output too large (${TOTAL_BYTES}). It could not be saved, so only the first ${SHOWN_BYTES} are shown; the rest was dropped. ${FOLLOW_UP_NOTE}
