<!--
name: 'Tool Result: Undeclared argument not sent'
description: >-
  Explains that a tool call was not sent because the target tool does not
  declare the specified parameter.
ccVersion: 2.1.318
variables:
  - TOOL_NAME
  - PARAMETER_NAME
-->
Not sent: ${TOOL_NAME} does not declare ${PARAMETER_NAME}. A server can drop an argument it does not declare and answer with that parameter's default instead. It takes: 
