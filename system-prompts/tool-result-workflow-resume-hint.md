<!--
name: 'Tool Result: Workflow resume hint'
description: >-
  Shows the Workflow call for re-running with edited post-processing, noting
  that agents with unchanged prompt and opts replay from cache.
ccVersion: 2.1.219
variables:
  - SCRIPT_PATH
  - RUN_ID
  - EXTRA_RESUME_ARGS
-->
To re-run with edited post-processing: Workflow({scriptPath: '${SCRIPT_PATH}', resumeFromRunId: '${RUN_ID}'${EXTRA_RESUME_ARGS}}) — agents whose (prompt, opts) are unchanged replay from cache.
