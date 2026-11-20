<!--
name: 'Tool Description: REPL script concurrency and output delivery'
description: >-
  Details detached script execution, variable sharing, output event handling,
  and waiting mechanics.
ccVersion: 2.1.329
variables:
  - REPL_TOOL_NAME
  - WAIT_TOOL_NAME
-->
 s. A script still running by then is `detached`: it keeps running beside the scripts after it, and they share variables. So put steps that depend on each other in one script, or send the second script only after the first one's outcome has come back. A `REPL` call only dispatches its script and returns `(dispatched #N)` at once. A receipt means the script is queued or running, so sending it again would run it twice. If a `${REPL_TOOL_NAME}` call returns its script's output instead, calls in this session run until their script ends, so await everything a script starts: a call that isn't awaited may not run, or may not run to its end.

How output arrives: after your reply's tool calls, if a script you sent in it is still running, the harness waits before continuing, until the script ends or something else arrives, such as a message from the user; things that arrive close together come together. What arrived then comes back in the `${WAIT_TOOL_NAME}` result of your reply, in the order it arrived: the script's 
