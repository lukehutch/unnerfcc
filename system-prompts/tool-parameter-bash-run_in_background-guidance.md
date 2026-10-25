<!--
name: 'Tool Parameter: Bash run_in_background guidance'
description: >-
  Explains Bash run_in_background behavior and that commands do not need a
  trailing ampersand
ccVersion: 2.1.310
variables:
  - NOTIFICATION_BEHAVIOR
-->
You can use the `run_in_background` parameter to run the command in the background. Only use this if you don't need the result immediately. ${NOTIFICATION_BEHAVIOR} You do not need to use '&' at the end of the command when using this parameter.
