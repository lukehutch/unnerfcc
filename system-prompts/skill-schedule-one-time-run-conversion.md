<!--
name: 'Skill: /schedule one-time run conversion'
description: >-
  Tells the scheduling flow to use run_once_at for one-time runs, re-check the
  current time with date -u, and confirm the resolved absolute timestamp with
  the user.
ccVersion: 2.1.219
-->
 If they want a one-time run (e.g., "once at 3pm", "tomorrow morning", "remind me to check X later"), use `run_once_at` instead of `cron_expression` — same timezone conversion applies. **First re-check the current time with `date -u` via Bash** (the reference time above may be stale in a long conversation), resolve the relative phrase against that fresh value, and confirm the resulting absolute timestamp with the user.
