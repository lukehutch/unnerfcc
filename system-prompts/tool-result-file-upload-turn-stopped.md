<!--
name: 'Tool Result: File upload interrupted when turn stopped'
description: >-
  Informs the model that a file upload was interrupted because the turn stopped
  and advises resending if the user still wants it.
ccVersion: 2.1.325
variables:
  - FILE_NAME
-->
${FILE_NAME} — the turn was stopped before the upload finished, which says nothing about the file or the network. Send the file again if the user still wants it
