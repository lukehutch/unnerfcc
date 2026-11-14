<!--
name: 'Tool Result: External wake scheduling and fallback guidance'
description: >-
  Details initiation flags, cancellation via trigger_id, and repeating the local
  cron call if the external wake tool fails.
ccVersion: 2.1.325
variables:
  - CRON_LIST_TOOL_NAME
  - CRON_DELETE_TOOL_NAME
  - CANCEL_TRIGGER_TOOL_NAME
  - CRON_CREATE_TOOL_NAME
-->
 from now (if that time has passed by then, pass "delay_minutes": 1 in place of "at"). Pass "initiation": "human_request" only if a person asked for this reminder or for this time; leave it out for your own check-in on work in flight. The message arrives within a few minutes of that time. ${CRON_LIST_TOOL_NAME} will not show it and ${CRON_DELETE_TOOL_NAME} cannot cancel it: to cancel it, pass the trigger_id in that call's answer to the same server's ${CANCEL_TRIGGER_TOOL_NAME} tool. If that call fails, and its answer does not tell you to stop scheduling, repeat this ${CRON_CREATE_TOOL_NAME} call unchanged within 15 minutes and before that time: it is then accepted, as a timer that lasts only as long as this process.
