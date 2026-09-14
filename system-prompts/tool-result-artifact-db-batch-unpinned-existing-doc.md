<!--
name: 'Tool Result: Artifact DB batch unpinned write to existing document'
description: >-
  Reports that a batch write contained an unpinned write to an existing
  document, causing the whole atomic batch to write nothing.
ccVersion: 2.1.270
variables:
  - ERROR_PREFIX
-->
${ERROR_PREFIX}: one of the writes targets a document that already exists and carried no if_version — the whole batch wrote nothing. Read the existing documents this batch writes, re-plan those entries on what they hold now with if_version set to the versions the reads return, then resend the batch
