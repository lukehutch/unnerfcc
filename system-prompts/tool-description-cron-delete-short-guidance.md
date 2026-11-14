<!--
name: 'Tool Description: CronDelete short usage guidance'
description: >-
  Instructs using the job-deletion tool rather than editing scheduled_tasks.json
  to stop scheduled jobs.
ccVersion: 2.1.325
variables:
  - CRON_CREATE_TOOL_NAME
-->
When you are about to stop a job that ${CRON_CREATE_TOOL_NAME} scheduled, use it and not an edit of .claude/scheduled_tasks.json, which does not hold session-only jobs.
