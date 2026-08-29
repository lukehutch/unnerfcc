<!--
name: 'Tool Result: Report cut so the harness note fits'
description: >-
  Harness note telling the model the subagent's report was cut to its first
  stretch of characters so that the report and the note could arrive together.
ccVersion: 2.1.251
variables:
  - HARNESS_NOTE_LEAD_IN
  - ORIGINAL_REPORT_LENGTH
  - TRUNCATED_REPORT_CHARACTERS
-->
${HARNESS_NOTE_LEAD_IN}the subagent's report was cut from ${ORIGINAL_REPORT_LENGTH} to its first ${TRUNCATED_REPORT_CHARACTERS} characters so that it and the note below arrive together.]
