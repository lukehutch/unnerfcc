<!--
name: 'Tool Result: Git safety glob pattern hazard'
description: >-
  Warns that wildcard characters in an argument will be expanded by the shell as
  a file pattern.
ccVersion: 2.1.318
-->
, whose * or ? the shell expands as a file pattern (an even run of backslashes does not escape it),
