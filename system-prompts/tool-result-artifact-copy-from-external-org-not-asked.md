<!--
name: 'Tool Result: Copy from external organization artifact not asked'
description: >-
  Explains that copying from an external organization's artifact requires
  approval and advises on retrying.
ccVersion: 2.1.277
variables:
  - FAILURE_OUTCOME
  - RETRY_ADVICE
-->
the source artifact belongs to another organization and nobody was asked whether to copy from another organization's artifact, so ${FAILURE_OUTCOME}. ${RETRY_ADVICE}
