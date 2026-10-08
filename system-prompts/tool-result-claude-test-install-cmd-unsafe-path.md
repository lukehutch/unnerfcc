<!--
name: 'Tool Result: Claude Test install folder path unsafe for cmd.exe'
description: >-
  Informs the model that the tools folder path contains unsafe characters for
  cmd.exe, preventing installation.
ccVersion: 2.1.293
-->
the path of the tools folder holds characters that cmd.exe would read as commands, so Claude Test cannot install there. Tell the person this, and that Claude Test cannot run on this machine until that path changes. Do not change that path unless the person asks you to. Do not change, move or delete the folder unless the person asks you to. Do not install another way.
