<!--
name: 'Tool Description: PowerShell sleep — long running commands'
description: >-
  PowerShell tool guideline instructing to use run_in_background instead of
  sleep for long-running commands.
ccVersion: 2.1.310
-->

    - If your command is long running and you would like to be notified when it finishes — simply run your command using `run_in_background`. There is no need to sleep in this case.
