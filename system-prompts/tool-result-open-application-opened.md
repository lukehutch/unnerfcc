<!--
name: 'Tool Result: Application opened'
description: >-
  Confirms an application was opened and tells the model to use switch_display
  if it is not visible in the next screenshot because it may be on another
  monitor.
ccVersion: 2.1.219
variables:
  - APPLICATION_NAME
-->
Opened "${APPLICATION_NAME}". If it isn't visible in the next screenshot, it may have opened on a different monitor — use switch_display to check.
