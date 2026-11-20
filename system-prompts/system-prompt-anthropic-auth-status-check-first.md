<!--
name: 'System Prompt: Anthropic auth status check first'
description: >-
  Instructs running ant auth status and reading its Credentials block when
  ANTHROPIC_API_KEY is unset instead of asking for a key.
ccVersion: 2.1.329
-->
**When you need to call the API and `ANTHROPIC_API_KEY` is unset, don't ask the user for a key.** First run `ant auth status` and read its `Credentials` block, not the `Active profile:` line. If the block has an `(active)` row:
