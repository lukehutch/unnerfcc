<!--
name: 'System Prompt: ant auth print-credentials inline subshell'
description: >-
  Instructs sending credentials inline via ant auth print-credentials or
  ANTHROPIC_AUTH_TOKEN in authorization headers.
ccVersion: 2.1.321
-->
send `Authorization: Bearer $(ant auth print-credentials --access-token)` (short-lived, and never printed this way; if the active row is `ANTHROPIC_AUTH_TOKEN`, send `$ANTHROPIC_AUTH_TOKEN`) **plus**
