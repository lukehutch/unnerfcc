<!--
name: 'System Prompt: Anthropic auth status check first'
description: >-
  Instructs running ant auth status to check credentials when ANTHROPIC_API_KEY
  is unset instead of asking for a key.
ccVersion: 2.1.321
-->
**When you need to call the API and `ANTHROPIC_API_KEY` is unset, don't ask the user for a key.** First run `ant auth status` - it shows which credential source and profile is active. If it reports an active profile:
