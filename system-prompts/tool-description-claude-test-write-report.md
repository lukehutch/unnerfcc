<!--
name: 'Tool Description: Claude Test write run report'
description: >-
  Describes writing the run report log.md in the run folder before calling the
  next completion tool.
ccVersion: 2.1.310
variables:
  - NEXT_TOOL_NAME
-->
Write the run's report, log.md in its run folder, with this text as the whole file. Call it again with the whole corrected text to change it. Then call ${NEXT_TOOL_NAME}. It works only after the run's save and until its results.json is written.
