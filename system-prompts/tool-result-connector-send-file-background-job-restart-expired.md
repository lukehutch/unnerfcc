<!--
name: 'Tool Result: Connector send file background job restart expired'
description: >-
  Explains that files attached before a background job restarted or transferred
  cannot be sent to connectors and must be re-attached.
ccVersion: 2.1.321
variables:
  - FILE_TYPE
  - FILE_PATH
  - LOCATION_HINT
  - PERMISSION_HINT
-->
Cannot send ${FILE_TYPE} ${FILE_PATH}: this session runs a background job, and from a background job only a file the user attached to the chat since the job last started can be sent to a connector; a file attached before it restarted, or before a window took it over, has to be attached again. ${LOCATION_HINT} ${PERMISSION_HINT}
