<!--
name: 'Skill: Debugging (log just enabled)'
description: >-
  Tells the model that debug logging only started with this /debug invocation
  and to have the user reproduce the issue before re-reading the log.
ccVersion: 2.1.219
variables:
  - DEBUG_LOG_PATH
-->

## Debug Logging Just Enabled

Debug logging was OFF for this session until now. Nothing prior to this /debug invocation was captured.

Tell the user that debug logging is now active at `${DEBUG_LOG_PATH}`, ask them to reproduce the issue, then re-read the log. If they can't reproduce, they can also restart with `claude --debug` to capture logs from startup.
