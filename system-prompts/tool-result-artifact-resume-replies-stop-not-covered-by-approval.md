<!--
name: 'Tool Result: Auto-replies not resumed — approval did not cover the stop'
description: >-
  Tells the model watching was stopped in this session outside what the consent
  card disclosed, so the stop stands and the user must be asked before
  resume_replies is called again.
ccVersion: 2.1.235
-->
 was stopped in this session (an unwatch or a task stop) and the approval did not cover that stop — it landed after the consent card was shown, or the card never disclosed it. The stop stays in place. Ask the user, and call resume_replies again only if they still want auto-replies resumed.
