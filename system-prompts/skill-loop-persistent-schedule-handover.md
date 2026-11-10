<!--
name: 'Skill: Loop persistent schedule handover via remote tool'
description: >-
  Instructs setting up a persistent remote loop tool call that survives cloud
  container recreation.
ccVersion: 2.1.321
variables:
  - REMOTE_TOOL_NAME
  - REMOTE_SERVER_NAME
  - TOOL_SEARCH_NAME
  - CANCEL_TOOL_NAME
  - CRON_DELETE_NAME
  - TIMER_CANCEL_NAME
  - EXPIRY_DAYS
-->

If a `${REMOTE_TOOL_NAME}` tool from the `${REMOTE_SERVER_NAME}` server is available (load it with ${TOOL_SEARCH_NAME} if it is deferred), also say they can ask for a loop that survives this. Build that loop only when they ask for it: in place of a timer, keep exactly one pending `${REMOTE_TOOL_NAME}` call, with a message that says what to run next, the cadence and the date to stop, in plain words and never as a `/loop` command. It is held outside the container and wakes the session on a new one. If anything wakes you while one is pending, cancel it with `${CANCEL_TOOL_NAME}` before you arm another. Once the first one is accepted, cancel any timer you set for this loop (${CRON_DELETE_NAME}, or ${TIMER_CANCEL_NAME} with `stop: true`). That only hands the loop over, so report the hand-over and skip the steps for a finished loop, whatever the tool's result says. Re-arm it only while the work is unfinished, stop after at most ${EXPIRY_DAYS} days, and if the user says stop, cancel the pending one with `${CANCEL_TOOL_NAME}`. If `${REMOTE_TOOL_NAME}` is refused, tell the user why and keep a timer running.
