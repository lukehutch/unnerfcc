<!--
name: 'Tool Result: Cross-session messaging paused for loop'
description: >-
  Informs the model that cross-session message delivery was paused due to a
  suspected automatic loop until the user sends a new prompt.
ccVersion: 2.1.325
variables:
  - TARGET_SESSION
-->
Not delivered: this session keeps answering other sessions, which looks like an automatic loop. Sending to ${TARGET_SESSION} is paused until your user's next prompt starts a turn in this session.
