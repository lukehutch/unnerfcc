<!--
name: 'Task Notification: Receipt may arrive after auto-replies resumed'
description: >-
  Clause telling the model this receipt reaches it on a later turn, and that a
  turn which is the user's own typed message has already resumed auto-replies.
ccVersion: 2.1.251
variables:
  - RESUMED_AUTO_REPLIES_PRONOUN
-->
this receipt reaches you with a later turn: if that turn is the user's own typed message it has already resumed ${RESUMED_AUTO_REPLIES_PRONOUN}
