<!--
name: 'Tool Result: Do not duplicate report with other tool'
description: >-
  Instructs not to send the report with another tool to prevent the caller
  receiving it twice.
ccVersion: 2.1.310
variables:
  - ALTERNATIVE_REPORT_TOOL
-->
 Do not also send the report with ${ALTERNATIVE_REPORT_TOOL}: your caller would get it twice.
