<!--
name: 'Tool Result: Retry tool call with unquoted parameter'
description: >-
  Error suffix instructing the model to retry the tool call with an unquoted
  native value in place of the quoted string.
ccVersion: 2.1.325
variables:
  - PARAMETER_NAME
  - UNQUOTED_VALUE_EXAMPLE
-->
 call again with "${PARAMETER_NAME}": ${UNQUOTED_VALUE_EXAMPLE} in place of "${PARAMETER_NAME}": "${UNQUOTED_VALUE_EXAMPLE}".
