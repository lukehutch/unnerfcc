<!--
name: 'Tool Result: Workflow resume hint'
description: >-
  Shows the Workflow call for re-running with edited post-processing, noting
  that matching agent() calls replay from cache up to the first changed or
  failed call.
ccVersion: 2.1.329
variables:
  - SCRIPT_PATH
  - RUN_ID
  - EXTRA_RESUME_ARGS
-->
To re-run with edited post-processing: Workflow({scriptPath: '${SCRIPT_PATH}', resumeFromRunId: '${RUN_ID}'${EXTRA_RESUME_ARGS}}) — agent() calls replay from cache up to the first one that failed or no longer matches (edited, added, removed, or in a different call order); that call and every later one run again. A call a usage limit refused usually runs again without ending reuse: finished calls after it still come from cache.
