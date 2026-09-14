<!--
name: 'Tool Result: Artifact DB batch stale pin'
description: >-
  Reports that a document pinned with if_version in a batch changed or no longer
  exists, and instructs re-reading and re-planning.
ccVersion: 2.1.270
variables:
  - ERROR_PREFIX
-->
${ERROR_PREFIX}. A document one of the writes was pinned to with if_version is no longer at that version (or no longer exists). Re-read the pinned documents, re-plan those writes against what they hold now with fresh pins, then resend the batch
