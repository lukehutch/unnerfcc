<!--
name: 'Tool Result: SendMessage self address'
description: >-
  Tool result notifying the model that the specified destination is its own
  session address.
ccVersion: 2.1.251
variables:
  - SESSION_ADDRESS
-->
'${SESSION_ADDRESS}' is this session's own address — a message or file sent there would only come back to this conversation; there is no one else at that address to send to.
