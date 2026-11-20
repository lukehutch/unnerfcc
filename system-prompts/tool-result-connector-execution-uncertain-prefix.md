<!--
name: 'Tool Result: Connector execution uncertain prefix'
description: >-
  Prefix stating it is unknown whether the connector tool ran and instructing
  the model to tell the user before proceeding.
ccVersion: 2.1.329
variables:
  - LEADING_CLAUSE
  - TOOL_NAME
  - ALREADY_SENT_CLAUSE
-->
${LEADING_CLAUSE}It is not known whether ${TOOL_NAME} ran.${ALREADY_SENT_CLAUSE} Tell the user before 
