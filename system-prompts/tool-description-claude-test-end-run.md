<!--
name: 'Tool Description: Claude Test end run and write results'
description: >-
  Describes ending the run and writing results.json from the verdict table after
  writing the log.
ccVersion: 2.1.310
variables:
  - WRITE_REPORT_TOOL_NAME
-->
After ${WRITE_REPORT_TOOL_NAME}: write results.json from the report's verdict table, which ends the run. When the run or any spec ended BLOCKED, "why" is the one word that names the main cause.
