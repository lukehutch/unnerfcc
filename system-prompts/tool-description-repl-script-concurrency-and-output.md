<!--
name: 'Tool Description: REPL script concurrency and output delivery'
description: >-
  Details detached script execution, variable sharing, output event handling,
  and waiting mechanics.
ccVersion: 2.1.318
variables:
  - TOOL_NAME
  - RESULT_TOOL_NAME
-->
 s. A script still running by then is `detached`: it keeps running beside the scripts after it, and they share variables. So put steps that depend on each other in one script, or send the second script only after the first one's outcome has come back. A `REPL` call only dispatches its script and returns `(dispatched #N)` at once. A receipt means the script is queued or running, so sending it again would run it twice. If a `${TOOL_NAME}` call returns its script's output instead, calls in this session run until their script ends, and anything a script starts without awaiting, such as a build or a dev server, is stopped when the script ends.

How output arrives: after your reply's tool calls, if a script you sent in it is still running, the harness waits before continuing, until the script ends or something else arrives, such as a message from the user; things that arrive close together come together. What arrived then comes back in the `${RESULT_TOOL_NAME}` result of your reply, in the order it arrived: the script's 
