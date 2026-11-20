<!--
name: 'Tool Description: REPL unawaited build and wait tool'
description: >-
  Model-facing REPL guidance showing how to start an unawaited background build
  with self.log and how to use the wait tool or end the turn.
ccVersion: 2.1.329
variables:
  - DEV_SERVER_NOTE
  - WAIT_TOOL_NAME
-->
.${DEV_SERVER_NOTE} To let a build run while you do other things, start it without awaiting it, log its result and end the script on another value (`const build = $`npm run build`.nothrow().then(r => self.log(r.exitCode, preview(r))); 'started'`).

Waiting at other times: `${WAIT_TOOL_NAME}` waits until a script ends or an event arrives, and says what is still running. When nothing needs doing, ending your turn works too: results start your next turn when they land.
