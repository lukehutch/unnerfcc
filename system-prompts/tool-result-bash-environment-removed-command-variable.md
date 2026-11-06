<!--
name: 'Tool Result: Shell environment removed command variable'
description: >-
  Explains that shell startup removed the command variable and directs running
  the command again on the command line.
ccVersion: 2.1.318
-->
Claude Code did not run this command: something that the shell runs first (a hook's environment file, say) removed the variable that held the command's text. Run it again: commands are now passed on the shell's command line instead.
