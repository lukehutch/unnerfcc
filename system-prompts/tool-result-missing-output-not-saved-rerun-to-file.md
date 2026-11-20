<!--
name: 'Tool Result: Missing output not saved, redirect to file'
description: >-
  Model-facing tool result message stating that the omitted output was not saved
  and advising re-running the command with output redirected to a file.
ccVersion: 2.1.329
variables:
  - FAILURE_SUMMARY
  - TRUNCATION_DETAIL
-->
${FAILURE_SUMMARY} ${TRUNCATION_DETAIL} What's missing was not saved. To read it, run the command again with its output sent to a file.
