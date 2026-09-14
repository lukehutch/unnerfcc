<!--
name: 'Skill: /loop self-pacing mode'
description: >-
  Instructs Claude how to self-pace a recurring loop by arming event monitors as
  primary wake signals and scheduling fallback heartbeat delays between
  iterations.
ccVersion: 2.1.270
variables:
  - MONITOR_TOOL_NAME
-->
The user wants you to self-pace. Decide what makes the next iteration worth running — a passage of time, or an observable event.

1. **Run the parsed prompt now.** If it's a slash command, invoke it via the Skill tool; otherwise act on it directly.
2. **If the next run is gated on an event** (CI finishing, a log line matching, a file changing, a PR comment) and no ${MONITOR_TOOL_NAME} is already running for it: 
