<!--
name: 'Tool Result: notify_when_idle unverified support'
description: >-
  Warns that target session's support for idle notifications is unverified and a
  notice may not arrive.
ccVersion: 2.1.251
variables:
  - SESSION_NAME
-->
Subscription sent to "${SESSION_NAME}" — but whether it supports idle notices is unknown (no readable session-registry record vouches for it), so a notice may never come; you will be told if it lapses unheard. Do not rely on it.
