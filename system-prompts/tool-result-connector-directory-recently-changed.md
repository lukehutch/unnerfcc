<!--
name: 'Tool Result: Connector directory entry recently changed'
description: >-
  Informs the model that a file was not sent because the connector or its
  directory entry changed recently and advises asking before retrying later.
ccVersion: 2.1.325
variables:
  - FILE_NAME
  - EXTRA_NOTE
-->
${FILE_NAME} was not sent: the connector, or its entry in Anthropic's connector directory, changed recently. ${EXTRA_NOTE} Calling the tool again in about ten minutes may work; ask the user first.
