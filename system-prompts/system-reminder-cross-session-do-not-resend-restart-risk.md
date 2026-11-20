<!--
name: 'System Reminder: Cross-session do not resend due to restart risk'
description: >-
  Model-facing instruction not to resend even after the recipient accepts
  messages again because the earlier copy may still be delivered after a
  restart.
ccVersion: 2.1.329
variables:
  - MESSAGE_NAME
-->
Do not resend, even once that session accepts messages again: it may still take ${MESSAGE_NAME} after a restart. Warn your user that a copy, or the same work done another way, may happen twice.
