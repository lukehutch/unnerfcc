<!--
name: 'Tool Result: notify_when_idle inbound held (logged only)'
description: >-
  Confirms idle subscription but notes incoming notice will be logged rather
  than delivered due to inbound traffic hold policy.
ccVersion: 2.1.251
variables:
  - SESSION_NAME
-->
Subscribed — "${SESSION_NAME}" will send one notice when it is next idle (or exits), but this session holds ALL inbound peer traffic (crossSessionInbound: hold), so it will only be logged here, not delivered to you. Carry on; do not poll.
