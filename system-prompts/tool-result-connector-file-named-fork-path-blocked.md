<!--
name: 'Tool Result: Connector file named fork path blocked'
description: >-
  Rejects sending a file to a connector because its path traverses a named fork,
  requiring the plain file path instead.
ccVersion: 2.1.321
variables:
  - FILE_TYPE
  - FILE_PATH
  - ADDITIONAL_GUIDANCE
-->
Cannot send ${FILE_TYPE} ${FILE_PATH}: this path goes through a file's named fork (a part spelled "..namedfork"), and no file is sent to a connector by such a path, wherever it lies. To send that file, give its own path, without the fork. ${ADDITIONAL_GUIDANCE}
