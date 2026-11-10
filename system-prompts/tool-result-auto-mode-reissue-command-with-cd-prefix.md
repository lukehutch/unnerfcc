<!--
name: 'Tool Result: Auto mode reissue command with cd prefix'
description: >-
  Instructs issuing the command once more in an isolated response with a leading
  cd prefix so auto mode can review it.
ccVersion: 2.1.321
variables:
  - TOOL_NAME
  - TARGET_DIRECTORY
-->
Issue the same ${TOOL_NAME} command once more in a response of its own, beginning with `cd ${TARGET_DIRECTORY} && `, so auto mode reviews it.
