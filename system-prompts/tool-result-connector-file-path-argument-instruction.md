<!--
name: 'Tool Result: Connector file path argument instruction'
description: >-
  Explains that the argument expects a file path rather than text and warns
  against retrying with text.
ccVersion: 2.1.321
variables:
  - PARAM_NAME
  - TOOL_NAME
  - EXTRA_NOTE
  - INVALID_PARAM
-->
 in ${PARAM_NAME}, so what you wrote there is not sent to ${TOOL_NAME} as text.${EXTRA_NOTE} Tell the user. Do not retry with ${INVALID_PARAM} set
