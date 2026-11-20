<!--
name: 'Tool Result: Auto mode judged without git status'
description: >-
  Informs the model that auto mode judged a git command without git status and
  will see it on the next three requests, allowing a retry if no work would be
  lost.
ccVersion: 2.1.329
-->
 Auto mode judged this without the repository's git status. It will see git status on your next three requests, which may clear a block on a git command that discards work. If git status shows nothing the command would lose, you may send it once more on its own.
