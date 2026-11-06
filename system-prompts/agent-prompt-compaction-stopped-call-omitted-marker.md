<!--
name: 'Agent Prompt: Compaction stopped call omitted bracketed marker'
description: >-
  Bracketed marker indicating a stopped tool call was omitted because it was too
  large for the summary request.
ccVersion: 2.1.318
variables:
  - CALL_IDENTIFIER
  - SIZE_OR_DETAILS
-->
${CALL_IDENTIFIER} its text was left out, too large for this summary request (${SIZE_OR_DETAILS}). A stopped call may have run, in part or in full.]
