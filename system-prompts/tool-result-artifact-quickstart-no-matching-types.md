<!--
name: 'Tool Result: Quickstart no matching types listed'
description: >-
  Reports that the account has no matching Artifact type listed to start from
  for the given intent.
ccVersion: 2.1.277
variables:
  - INTENT
  - TYPE_CATEGORY
  - OMISSION_NOTE
  - NEXT_STEP
-->
Quickstart for ${INTENT}: this account lists no ${TYPE_CATEGORY} type to start from${OMISSION_NOTE}. ${NEXT_STEP}
