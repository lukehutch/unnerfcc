<!--
name: 'Tool Result: Durable wake subscription arming'
description: >-
  Tells the model the durable wake subscription is arming in the background and
  not yet active until status lists it.
ccVersion: 2.1.251
variables:
  - WAKE_SCOPE
-->
Durable wake subscription: arming in the background — not registered yet, so this is not a subscription until `status` lists it (you are told if it cannot be registered). Once registered, ${WAKE_SCOPE}.
