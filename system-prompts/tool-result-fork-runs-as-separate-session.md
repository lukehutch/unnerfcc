<!--
name: 'Tool Result: Fork runs as a separate session'
description: >-
  Tells the model a forked session runs independently of this conversation after
  the fork point and where it appears in the agent listing.
ccVersion: 2.1.231
variables:
  - LIST_AGENTS_TOOL_NAME
-->
The fork runs as its own separate session — nothing it does arrives in this conversation, and it does not see what happens here after the fork point. If you need to coordinate with it, it appears in the ${LIST_AGENTS_TOOL_NAME} listing as '
