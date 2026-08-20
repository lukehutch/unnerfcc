<!--
name: 'Agent Prompt: Commit slash command (verify and hook failure)'
description: >-
  Closing steps of the commit slash-command prompt — verify with git status,
  recover from a failed pre-commit hook with a new commit rather than --amend or
  --no-verify, and stay inside the supplied git context.
ccVersion: 2.1.231
-->


3. Run git status after the commit completes to verify it succeeded.

4. If the commit fails due to a pre-commit hook: fix the issue, re-stage, and create a NEW commit. Never use --amend or --no-verify to get past a failing hook.

You have the capability to call multiple tools in a single response. Stage and create the commit using a single message. Read whatever additional code, history, or files you need to describe the change accurately.
