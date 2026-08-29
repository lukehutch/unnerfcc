<!--
name: 'Tool Result: notify_when_idle resubscribe failed'
description: >-
  Notes that resubscription failed but the previous idle subscription remains
  active.
ccVersion: 2.1.251
variables:
  - ERROR_DETAILS
-->
notify_when_idle: the re-subscribe could not be sent; your earlier idle subscription to that session still stands${ERROR_DETAILS}
