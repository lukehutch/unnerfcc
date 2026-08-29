<!--
name: 'Tool Result: Artifact watch connecting status'
description: >-
  Explains that the watch is still connecting and comment notification status is
  pending.
ccVersion: 2.1.251
variables:
  - STATUS_EXPECTATION
-->
 It is still connecting, so whether a comment sent to Claude reaches this session through it is not settled — its `status` row will say (${STATUS_EXPECTATION}, or not); plain comments never notify.
