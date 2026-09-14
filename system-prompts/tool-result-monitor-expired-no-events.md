<!--
name: 'Tool Result: Monitor expired with no events'
description: >-
  Notifies the model that a background monitor expired with no events delivered
  and advises re-arming or widening the filter.
ccVersion: 2.1.270
variables:
  - TIMEOUT
-->
[Monitor expired after ${TIMEOUT} with no events delivered. Re-arm it if you still need the watch — and widen the filter if silence was unexpected.]
