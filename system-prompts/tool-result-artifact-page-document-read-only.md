<!--
name: 'Tool Result: Artifact page document read only'
description: >-
  Informs the model that a document is reserved by the artifact's own page, can
  only be read with read_db, and cannot be written or deleted.
ccVersion: 2.1.321
variables:
  - DOCUMENT_PATH
-->
${DOCUMENT_PATH} is kept by the artifact's own page. You can read it with read_db, but not write or delete it. Trying again will not help, so do not try to write it another way or under another name.
