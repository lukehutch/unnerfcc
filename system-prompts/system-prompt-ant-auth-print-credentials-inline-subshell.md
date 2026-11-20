<!--
name: 'System Prompt: ant auth print-credentials inline subshell'
description: >-
  Instructs sending credentials inline via ant auth print-credentials or
  ANTHROPIC_AUTH_TOKEN in authorization headers.
ccVersion: 2.1.329
-->
**Raw `curl` / HTTP (`Profile` or `ANTHROPIC_AUTH_TOKEN` row):** send `Authorization: Bearer $(ant auth print-credentials --access-token)` (short-lived, and never printed this way; on an `ANTHROPIC_AUTH_TOKEN` row, send `$ANTHROPIC_AUTH_TOKEN`) **plus**
