<!--
name: 'Tool Result: Artifact stored local servers grant read failed'
description: >-
  Informs that reading the local-server grant failed when the artifact's stored
  declaration references local servers.
ccVersion: 2.1.272
variables:
  - ERROR_DETAILS
-->
this computer's local-server grant (${ERROR_DETAILS}) could not be read. It is set by the app that launched this session and is not something to fix from here. The artifact's stored declaration names local servers — 
