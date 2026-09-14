<!--
name: 'Tool Result: Artifact DB Batch Atomic Nothing Written'
description: >-
  Confirms that an atomic batch write failed and nothing was written to the
  database.
ccVersion: 2.1.270
variables:
  - ERROR_MESSAGE
  - UNSUPPORTED_VERSION_NOTE
-->
${ERROR_MESSAGE}; the batch is atomic, so nothing was written${UNSUPPORTED_VERSION_NOTE}
