<!--
name: 'Tool Result: REPL orphaned tool call rejected'
description: >-
  Rejects a tool call made by asynchronous code left behind by a finished script
  that did not await it.
ccVersion: 2.1.318
-->
[Tool call not made: the script that started this code has returned and none of its calls is still running, and after that the code it left behind can make no more calls. Nobody stopped or declined this call. To run these steps, await them inside one script.]
