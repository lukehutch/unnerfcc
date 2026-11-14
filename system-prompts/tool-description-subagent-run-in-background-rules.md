<!--
name: 'Tool Description: Subagent run in background rules'
description: >-
  Describes background subagent execution, notifications, and prohibition of
  result fabrication.
ccVersion: 2.1.325
variables:
  - TOOL_USAGE_EXTRA_NOTE
-->

- A subagent runs in the background only if you pass `run_in_background: true`; even then it may run in the foreground or be refused. When one does run in the background, you'll be notified when it completes.${TOOL_USAGE_EXTRA_NOTE} Never fabricate or predict a pending agent's results — the notification is never something you write yourself; if the user asks before it arrives, say it's still running.
