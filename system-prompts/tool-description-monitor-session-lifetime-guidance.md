<!--
name: 'Tool Description: Monitor session lifetime guidance'
description: >-
  Warns that monitor processes are stopped shortly after replying and advises
  running foreground blocking commands instead.
ccVersion: 2.1.318
variables:
  - TOOL_NAME
-->
In this session a monitor can be counted on only while you are working: a few minutes after your reply it is likely stopped along with every other process left running here, and you may hear nothing more from it, not even that it stopped, until the user writes again. To wait for one thing before you answer, run a foreground ${TOOL_NAME} command that exits when it happens.
