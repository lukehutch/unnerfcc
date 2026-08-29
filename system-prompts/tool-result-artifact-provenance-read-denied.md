<!--
name: 'Tool Result: Provenance read denied'
description: >-
  Republish refusal telling the model the published-page read was denied, that
  this is usually a permanent policy deny worth at most one retry, and that
  every republish verifies decision provenance against the page.
ccVersion: 2.1.251
variables:
  - DENIAL_REASON
-->
could not read the published page to verify decision provenance (read denied: ${DENIAL_REASON}). This is usually a permanent policy deny — retry at most once (a concurrent republish can cause a one-off stale-version 403); every republish verifies decision provenance against the published page.
