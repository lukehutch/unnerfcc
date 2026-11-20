<!--
name: 'Tool Description: Durable scheduled jobs persistence'
description: >-
  Explains that durable scheduled jobs persist to .claude/scheduled_tasks.json
  across restarts while session-only jobs exit with the process.
ccVersion: 2.1.329
-->
Durable jobs persist to .claude/scheduled_tasks.json and survive session restarts — on the next launch signed in to the same organization they resume automatically. One-shot durable tasks that were missed while the REPL was closed are surfaced for catch-up. Session-only jobs die with the process. 
