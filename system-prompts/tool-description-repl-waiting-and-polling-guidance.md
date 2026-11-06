<!--
name: 'Tool Description: REPL waiting and polling guidance'
description: >-
  Details waiting, prompt caching, background tasks, and polling behavior when
  using REPL scripts.
ccVersion: 2.1.318
variables:
  - WAIT_TOOL_NAME
-->
 meanwhile saying what is still pending. A receipt means the script is running, so issuing it again would run it twice. Scripts start in call order.

Waiting: `${WAIT_TOOL_NAME}` returns as soon as something arrives; while a script or a background task (a context, say) is still running, a wait with nothing to deliver ends just before the prompt cache would expire (about 5 minutes, or about an hour on a 1-hour cache) in a status line saying what is still pending, so you can poll again. Sent in the same turn as a `REPL` call it waits for that call's script: a long one (a test suite, a build) then costs no extra round trip, and one that has already come back ends the wait at once. When nothing else needs doing while a long script or a context runs, ending your turn works too: its result or notification starts your next turn when it lands, and waiting that way costs nothing. A shell command with no timeout of its own moves to the background after 10 minutes, so give a long build a longer timeout (up to 2 hours) to await it.
