<!--
name: 'Tool Description: Monitor options (single turn)'
description: Details monitor options for notifications during the current turn.
ccVersion: 2.1.310
variables:
  - MONITOR_TOOL_NAME
-->
- **One per occurrence, while you work on this turn** ("show each ERROR line in the dev server's log while you try the change") → ${MONITOR_TOOL_NAME} with an unbounded command (`tail -f`, `inotifywait -m`, `while true`).
- **One per occurrence, until a known end, while you work on this turn** ("show each test file's result as the suite you just started runs, stop when it ends") → ${MONITOR_TOOL_NAME} with a command that emits lines and then exits.
