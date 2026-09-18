<!--
name: 'Tool Result: Artifact watch ended'
description: >-
  Tells the model the artifact watch ended and why, that this session will no
  longer hear about republishes, and what follows from that.
ccVersion: 2.1.277
variables:
  - WATCH_END_REASON
  - WATCH_FOLLOW_UP_NOTE
-->
 ended — ${WATCH_END_REASON}. This session no longer keeps track of new versions of it; ${WATCH_FOLLOW_UP_NOTE}.
