<!--
name: 'System Reminder: Host-relayed message response prompt'
description: >-
  Tells the model to decide after its current task whether to respond, and to
  reply through the host application's own messaging tool because the message's
  from= is a host session id SendMessage cannot reach.
ccVersion: 2.1.251
-->
 After completing your current task, decide whether/how to respond. This message was delivered by your host application, and its `from=` is a host session id that SendMessage cannot reach: reply through the host's own messaging tool with that id, if it provides one.
