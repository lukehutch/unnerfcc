<!--
name: 'Tool Description: Bash (until-loop wait for condition)'
description: >-
  Tells the model to wait on a condition with a backgrounded Bash until-loop
  that exits when the condition holds, yielding one completion notification.
ccVersion: 2.1.219
-->
use **Bash with `run_in_background`** and a command that exits when the condition is true, e.g. `until grep -q "Ready in" dev.log; do sleep 0.5; done`. You get a single completion notification when it exits.
