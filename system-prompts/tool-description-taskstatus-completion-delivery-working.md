<!--
name: 'Tool Description: TaskStatus completion delivery while working'
description: >-
  Explains that background task results may only be delivered between tool calls
  and advises waiting in the foreground if needed.
ccVersion: 2.1.318
variables:
  - DELIVERY_MODE_PREFIX
-->
${DELIVERY_MODE_PREFIX}between your tool calls, if it finishes while you are still working. After your reply you may not be told when it finishes, so if you need its result, wait for it before you reply, in the foreground.
