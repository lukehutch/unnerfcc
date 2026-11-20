<!--
name: Workflow resumeFromRunId
description: >-
  Description of the 'resumeFromRunId' input parameter in the Workflow tool's
  inputSchema detailing positional cache replay and usage-limit handling;
  model-facing.
ccVersion: 2.1.329
variables:
  - STOP_TOOL_NAME
-->
Run ID of a prior Workflow invocation to resume from. The cache is positional: agent() calls replay from cache up to the first call that failed, no longer matches the earlier run (edited, added, removed or reordered) or never started in it; that call and every call after it run again, even when their own (prompt, opts) are unchanged. A call a usage limit refused, or one still running when the run stopped, usually runs again without ending reuse: finished calls after it still come from cache. Same-session only. Stop the prior run first (${STOP_TOOL_NAME}) before resuming.
