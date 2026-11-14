<!--
name: 'Tool Result: Connector file delivery uncertain prefix'
description: >-
  Prefix warning that it is unknown whether a file reached the connector and
  resending may duplicate it.
ccVersion: 2.1.325
variables:
  - FILE_NAME
  - STORAGE_STATUS_DETAIL
  - EXISTING_FILE_NOTE
-->
It is not known whether ${FILE_NAME} reached the connector: ${STORAGE_STATUS_DETAIL}, and sending it again may store it twice. ${EXISTING_FILE_NOTE} Tell the user, and do not send 
