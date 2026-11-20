<!--
name: 'Tool Description: REPL turn efficiency and waiting strategy'
description: >-
  Provides strategic guidance on script composition, turn efficiency,
  long-running commands, and waiting tools.
ccVersion: 2.1.329
variables:
  - WAIT_TOOL_NAME
-->
 naming any script still running. A message the user sent follows the tool results as the user's own text. You don't need to call `${WAIT_TOOL_NAME}` after a `REPL` call. Output a script logs after it has ended arrives the same way, as late output under its number.

So waiting inside a script costs you no turns and keeps no one waiting on you: anything addressed to you ends the wait within a few seconds. Put all the work this turn can do into one script, including awaiting a build or a test run and acting on its exit code, and come back when the next step needs your judgment about a result. A long command that a script awaits runs until it ends or reaches its timeout (10 minutes if you gave it none), when 
