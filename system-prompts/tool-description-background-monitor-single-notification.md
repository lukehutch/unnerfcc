<!--
name: 'Tool Description: Background monitor single-notification case'
description: >-
  Branch of the monitor tool description routing a one-notification wait to a
  foreground Bash until-loop that exits when the condition is true.
ccVersion: 2.1.219
-->
run the command in the **foreground with Bash**, exiting when the condition is true, e.g. `until grep -q "Ready in" dev.log; do sleep 0.5; done`.
