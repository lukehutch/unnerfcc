<!--
name: 'Tool Result: Output too large and truncated without saving'
description: >-
  Tool result indicating command output exceeded size limits, could not be saved
  to disk, and was truncated to the first portion.
ccVersion: 2.1.277
variables:
  - OUTPUT_HEADER
  - TOTAL_BYTES
  - SHOWN_BYTES
  - TRUNCATED_OUTPUT
  - OUTPUT_FOOTER
-->
${OUTPUT_HEADER}
Output too large (${TOTAL_BYTES}). It could not be saved, so only the first ${SHOWN_BYTES} are shown; the rest was dropped. If the tool can page or filter its results, call it again for the part you need.

${TRUNCATED_OUTPUT}
${OUTPUT_FOOTER}
