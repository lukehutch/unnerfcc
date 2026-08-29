<!--
name: 'Tool Result: notify_when_idle conditional delivery'
description: >-
  Confirms subscription with condition under which the notice is delivered
  directly versus transcript display.
ccVersion: 2.1.251
variables:
  - SESSION_NAME
  - DELIVERY_CONDITION
-->
Subscribed — you will get one notice here when "${SESSION_NAME}" is next idle (or exits), provided ${DELIVERY_CONDITION} or asserts none; otherwise it is 
