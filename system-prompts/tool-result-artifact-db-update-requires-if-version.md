<!--
name: 'Tool Result: Artifact DB update requires if_version'
description: >-
  Reports that updating an existing document requires if_version to prevent
  blind overwrites.
ccVersion: 2.1.270
variables:
  - ERROR_PREFIX
  - DOC_ID
-->
${ERROR_PREFIX}: ${DOC_ID} is an existing document and this update carried no if_version — nothing was written. Read it back with read_db, base the change on what it holds now, and resend with if_version set to the version that read returns
