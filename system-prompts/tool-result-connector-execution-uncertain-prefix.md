<!--
name: 'Tool Result: Connector execution uncertain prefix'
description: >-
  Prefix stating it is unknown whether the connector tool ran and instructing
  the model to tell the user before proceeding.
ccVersion: 2.1.325
variables:
  - TOOL_NAME
  - ALREADY_SENT_CLAUSE
-->
It is not known whether ${TOOL_NAME} ran.${ALREADY_SENT_CLAUSE} Tell the user before 
