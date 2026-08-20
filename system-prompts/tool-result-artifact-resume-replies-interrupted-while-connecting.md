<!--
name: 'Tool Result: Auto-replies not resumed — interrupted while connecting'
description: >-
  Tells the model the request was interrupted before the live watch finished
  connecting so the auto-reply stop stands, that a connection already under way
  may still complete as a plain version watch, and to ask the user before
  retrying.
ccVersion: 2.1.235
-->
Auto-replies were NOT resumed: the request was interrupted before the live watch finished connecting, so the auto-reply stop stays in place (a connection already under way may still complete as a plain version watch — action "status" shows it). Ask the user, and call resume_replies again only if they still want auto-replies resumed.
