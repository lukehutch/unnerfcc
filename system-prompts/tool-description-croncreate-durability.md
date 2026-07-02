<!--
name: 'Tool Description: CronCreate (durability note)'
description: >-
  Sub-prompt explaining the durable: true / false trade-off, inserted into
  CronCreate when the durable-cron feature flag is on
ccVersion: 2.1.144
-->
## Durability

By default (durable: false) the job lives only in this Claude session — nothing is written to disk, and the job is gone when Claude exits. Pass durable: true to write to .claude/scheduled_tasks.json so the job survives restarts. Only use durable: true when the user explicitly asks for the task to persist ("keep doing this every day", "set this up permanently"). Most "remind me in 5 minutes" / "check back in an hour" requests should stay session-only.
