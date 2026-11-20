<!--
name: 'Tool Result: Connector file path argument instruction'
description: >-
  Explains that the argument expects a file path rather than text and warns
  against retrying with that parameter.
ccVersion: 2.1.329
variables:
  - PARAM_NAME
  - TOOL_NAME
  - EXTRA_NOTE
-->
 in ${PARAM_NAME}, so what you wrote there is not sent to ${TOOL_NAME} as text.${EXTRA_NOTE} Tell the user. Do not retry with 
