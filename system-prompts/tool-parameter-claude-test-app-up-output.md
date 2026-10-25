<!--
name: 'Tool Parameter: claude_test_app_up output'
description: >-
  Specifies the path to the background start command output file when checking
  in a subsequent turn.
ccVersion: 2.1.310
-->
With wait, only when the check comes in a later message than the background Bash call that started the app: the path after "Output is being written to:" in that call's answer, exactly as it was printed. Leave it out when the check is in the same message as that start, right after it.
