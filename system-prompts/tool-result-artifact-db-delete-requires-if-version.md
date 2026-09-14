<!--
name: 'Tool Result: Artifact DB delete requires if_version'
description: >-
  Reports that deleting an existing document requires if_version and instructs
  re-reading before resending.
ccVersion: 2.1.270
variables:
  - ERROR_PREFIX
  - DOC_ID
-->
${ERROR_PREFIX}: ${DOC_ID} is an existing document and this delete carried no if_version — nothing was deleted. Read it back and, if it should still be deleted, resend the delete with if_version set to the version that read returns
