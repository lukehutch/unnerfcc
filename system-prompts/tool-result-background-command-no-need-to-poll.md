<!--
name: 'Tool Result: No need to poll a background command'
description: >-
  Tells the model the finished command's result is delivered automatically, so
  it need not check or sleep, and may end the turn if that result is all it
  awaits.
ccVersion: 2.1.251
variables:
  - RESULT_DELIVERY_TIMING_NOTE
-->
When it finishes, its result is delivered to you automatically — ${RESULT_DELIVERY_TIMING_NOTE} — so there is no need to check whether it is done or to sleep; if that result is all you are waiting for, end your turn.
