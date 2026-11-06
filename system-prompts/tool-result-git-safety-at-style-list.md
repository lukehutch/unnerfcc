<!--
name: 'Tool Result: Git safety @-style list rejected'
description: >-
  Rejects an @-style shell parameter list in a git command because it can expand
  to multiple words or none.
ccVersion: 2.1.318
-->
that should be one element ("$1", "${a[0]}") or spelled out rather than an @-style list (several words, or none, even inside double quotes)
