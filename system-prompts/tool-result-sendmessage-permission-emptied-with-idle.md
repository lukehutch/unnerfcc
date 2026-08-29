<!--
name: 'Tool Result: SendMessage emptied by permission handler (with idle)'
description: >-
  Explains that permission filtering emptied the message and aborted the idle
  subscription.
ccVersion: 2.1.251
-->
A permission handler emptied this message; nothing was sent, and no idle subscription was made (a blanked delivery is never reinterpreted as a pure subscription — send notify_when_idle without a message if that is what you want).
