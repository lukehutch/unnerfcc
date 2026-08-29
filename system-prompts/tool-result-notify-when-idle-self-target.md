<!--
name: 'Tool Result: notify_when_idle self target'
description: >-
  Notes that an idle subscription target is the current session itself, so
  nothing was subscribed.
ccVersion: 2.1.251
variables:
  - SESSION_NAME
-->
notify_when_idle: ${SESSION_NAME} is THIS session — nothing was subscribed; you already know when your own turn ends.
