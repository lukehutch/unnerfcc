<!--
name: 'Tool Result: Claude Test first look cannot read from tool'
description: >-
  Informs that first look mode cannot use this tool and suggests narrowing
  snapshots.
ccVersion: 2.1.310
variables:
  - SAVE_TOOL_NAME
-->
: a first look gets nothing from this tool. Narrow the snapshot with depth, target or browser_find. In mode "run", call ${SAVE_TOOL_NAME} first.
