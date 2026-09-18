<!--
name: 'Tool Result: Artifact upload failed retry approval carries over'
description: >-
  Informs that an upload failure occurred after start, advising retry while
  earlier approval carries over.
ccVersion: 2.1.277
variables:
  - ERROR_DETAIL
  - RETRY_ADVICE
-->
${ERROR_DETAIL}, which only became clear after the upload started, so nothing was published yet. ${RETRY_ADVICE}. The earlier approval of that artifact carries over to the retry.
