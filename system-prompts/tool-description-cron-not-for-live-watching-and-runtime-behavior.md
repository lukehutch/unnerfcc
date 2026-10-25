<!--
name: 'Tool Description: CronCreate not for live watching'
description: >-
  Distinguishes cron from live monitoring and explains REPL idle firing
  behavior.
ccVersion: 2.1.310
variables:
  - CRON_TOOL_NAME
  - MONITOR_TOOL_NAME
-->


## Not for live watching

${CRON_TOOL_NAME} re-runs a prompt at fixed wall-clock intervals. To watch a log file, process, or command output and be notified the moment something changes, use the ${MONITOR_TOOL_NAME} tool instead — ${MONITOR_TOOL_NAME} streams events as they happen; cron polls on a schedule.

## Runtime behavior

Jobs only fire while the REPL is idle (not mid-query). 
