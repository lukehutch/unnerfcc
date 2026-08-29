<!--
name: 'Tool Result: notify_when_idle inbound held (transcript only)'
description: >-
  Confirms idle subscription but notes incoming notice will appear in transcript
  rather than direct agent delivery.
ccVersion: 2.1.251
variables:
  - SESSION_NAME
-->
Subscribed — "${SESSION_NAME}" will send one notice when it is next idle (or exits); this session holds ALL inbound peer traffic (crossSessionInbound: hold), so it will be shown to your user in the transcript, not delivered to you. Carry on; do not poll.
