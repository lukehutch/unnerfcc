<!--
name: 'Agent Prompt: /schedule cron expression examples'
description: >-
  Cron cadence examples and the one-hour minimum interval for the /schedule
  cloud-agent flow.
ccVersion: 2.1.219
-->


- `0 9 * * 1-5` — Every weekday at 9am **UTC**
- `0 */2 * * *` — Every 2 hours
- `0 0 * * *` — Daily at midnight **UTC**
- `30 14 * * 1` — Every Monday at 2:30pm **UTC**
- `0 8 1 * *` — First of every month at 8am **UTC**

Minimum interval is 1 hour. `*/30 * * * *` will be rejected.
