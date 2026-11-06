<!--
name: 'Tool Result: Git safety rsync word splitting restrictions'
description: >-
  Explains character restrictions for rsync arguments because rsync performs its
  own word splitting.
ccVersion: 2.1.318
-->
, which rsync splits into words itself, with no shell, so what it runs cannot be shown not to be git (to pass, use only ASCII letters, digits, spaces, undoubled quotes and _ . , : / = + @ % ^ ~ -, with ~ only as ~/ at the start or after a : or =)
