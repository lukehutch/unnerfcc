<!--
name: 'Tool Result: Connector directory verification failed'
description: >-
  Refuses sending a file because the connector could not be verified against
  Anthropic's directory, forbidding retries and noting re-add risks.
ccVersion: 2.1.325
variables:
  - FILE_NAME
  - EXTRA_NOTE
-->
${FILE_NAME} was not sent: Claude's upload service could not confirm that this connector is set up as Anthropic's connector directory lists it, at a listed address and with a listed way of signing in. Do not retry. Tell the user; whoever manages this organization's connectors can check it. Removing it and adding it again from the directory may fix this, but removing it can reset who may use it, withdraw health-data consents given for it and remove extra accounts people added to it. ${EXTRA_NOTE}
