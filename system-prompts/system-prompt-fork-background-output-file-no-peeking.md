<!--
name: 'System Prompt: Background fork output file no peeking'
description: >-
  Directs not reading or tailing a background fork's output_file path and
  waiting for completion notification.
ccVersion: 2.1.310
-->
A background fork's tool result includes an `output_file` path — do not Read or tail it. It sends a completion notification
