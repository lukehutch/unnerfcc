<!--
name: 'Tool Result: Artifact DB write existing requires if_version'
description: >-
  Reports that writing to an existing document requires if_version and instructs
  re-reading before resending.
ccVersion: 2.1.270
variables:
  - ERROR_PREFIX
  - DOC_ID
-->
${ERROR_PREFIX}: ${DOC_ID} already exists and this write carried no if_version — nothing was written. Read it back with read_db, base the change on what it holds now, and resend with if_version set to the version that read returns
