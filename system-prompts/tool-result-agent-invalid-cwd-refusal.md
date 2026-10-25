<!--
name: 'Tool Result: Agent invalid cwd refusal'
description: >-
  Informs the caller that the agent cannot execute in the specified directory
  and directs starting it without cwd.
ccVersion: 2.1.310
variables:
  - ERROR_REASON
-->
Cannot run the agent in another directory: ${ERROR_REASON}. Start it without cwd.
