<!--
name: 'Tool Result: Claude Test report exceeds size limit'
description: >-
  Error stating report exceeds 1 MiB limit and instructing to shorten per-spec
  logs.
ccVersion: 2.1.310
variables:
  - REPORT_BYTES
  - LIMIT_BYTES
-->
: the report is ${REPORT_BYTES} bytes; the limit is 1 MiB (${LIMIT_BYTES} bytes). Shorten the log of each spec, and call again with the whole report.
