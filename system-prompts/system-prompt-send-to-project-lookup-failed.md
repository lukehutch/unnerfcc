<!--
name: 'System Prompt: Send to Project lookup failed'
description: >-
  Instructs informing the user that project lookup failed and advising them to
  re-run the command.
ccVersion: 2.1.318
variables:
  - ERROR_DETAILS
-->
That project couldn’t be looked up just now (${ERROR_DETAILS}). Tell the user to run /send-to-project again in a moment, and stop.
