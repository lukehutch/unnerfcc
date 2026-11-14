<!--
name: 'Tool Result: Connector call not run and files unsent'
description: >-
  Confirms that the connector tool did not run and none of its files finished
  sending.
ccVersion: 2.1.325
variables:
  - TOOL_NAME
  - FILE_LIST
-->
${TOOL_NAME} did not run, and none of ${FILE_LIST} had finished sending.
