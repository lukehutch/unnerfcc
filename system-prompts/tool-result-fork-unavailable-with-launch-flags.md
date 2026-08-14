<!--
name: 'Tool Result: Fork unavailable with safe/bare launch flags'
description: >-
  Tells the model a fork was refused because this session's safe/bare launch
  flags would not carry into the copy, and to run the task here or fork from a
  session started without them.
ccVersion: 2.1.232
variables:
  - LAUNCH_FLAGS
-->
Can't fork: this session was started with launch flags (safe or bare mode, ${LAUNCH_FLAGS}) that the copy wouldn't inherit, so it would run with fewer restrictions than this session. Run the task here, or start a session without those flags and fork from there.
