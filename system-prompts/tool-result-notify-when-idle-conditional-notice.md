<!--
name: 'Tool Result: notify_when_idle conditional notice'
description: >-
  Confirms subscription stating delivery condition to the agent versus fallback
  delivery.
ccVersion: 2.1.251
variables:
  - SESSION_NAME
  - DELIVERY_CONDITION
-->
Subscribed — "${SESSION_NAME}" will send one notice when it is next idle (or exits). It is delivered to you if ${DELIVERY_CONDITION}; otherwise it is 
