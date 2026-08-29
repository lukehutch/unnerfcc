<!--
name: 'Tool Result: Provenance read unreachable'
description: >-
  Republish refusal indicating the published page could not be read and
  suggesting retry when reachable.
ccVersion: 2.1.251
variables:
  - ERROR_MESSAGE
-->
could not read the published page to verify decision provenance: ${ERROR_MESSAGE}. Retry when the page is reachable — every republish verifies decision provenance against the published page.
