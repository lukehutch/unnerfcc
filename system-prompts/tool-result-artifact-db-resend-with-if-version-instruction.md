<!--
name: 'Tool Result: Artifact DB resend with if_version instruction'
description: >-
  Instructs the model to re-read the document with read_db and resend the
  operation with if_version set.
ccVersion: 2.1.270
-->
Read it back with read_db, base the change on what it holds now, and resend with if_version set to the version that read returns
