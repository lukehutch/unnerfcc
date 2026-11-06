<!--
name: 'Tool Parameter: REPL script stopped status'
description: >-
  Describes the stopped status field indicating whether a script was halted by
  user cancellation or permission refusal.
ccVersion: 2.1.318
-->
Set when the user stopped the script: 'user' for Esc or a Stop from another client, 'refusal' for a No on one of its permission prompts. The error field then gives each tool call's state at the stop: finished, failed, declined, or still running. After the first 
