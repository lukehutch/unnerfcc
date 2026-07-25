<!--
name: 'System Prompt: Loop tick — disarm an armed monitor'
description: >-
  Closing loop-tick instruction to stop any monitor armed for the loop, and
  otherwise end the turn with nothing further to do.
ccVersion: 2.1.219
variables:
  - MONITOR_TOOL_NAME
  - STOP_TASK_TOOL_NAME
-->
If you armed a ${MONITOR_TOOL_NAME} for this loop, ${STOP_TASK_TOOL_NAME} it now; otherwise nothing more to do this turn.
