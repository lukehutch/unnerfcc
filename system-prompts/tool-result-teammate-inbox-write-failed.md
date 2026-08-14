<!--
name: 'Tool Result: Teammate inbox write failed'
description: >-
  Tells the model that writing to a running teammate's inbox failed, nothing was
  queued, and to try again.
ccVersion: 2.1.231
variables:
  - TEAMMATE_NAME
-->
Teammate "${TEAMMATE_NAME}" is running, but writing to its inbox failed — nothing was queued. Try again.
