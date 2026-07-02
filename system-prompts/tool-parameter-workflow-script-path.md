<!--
name: Workflow scriptPath parameter
description: >-
  Workflow tool inputSchema (eVp) param description for the scriptPath option;
  model-facing as part of the Workflow tool's input_schema.
ccVersion: 2.1.191
-->
Path to a workflow script file on disk. Every Workflow invocation persists its script under the session directory and returns the path in the tool result. To iterate, edit that file with Write/Edit and re-invoke Workflow with the same `scriptPath` instead of re-sending the full script. Takes precedence over `script` and `name`.
