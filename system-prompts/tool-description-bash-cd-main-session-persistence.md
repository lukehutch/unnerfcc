<!--
name: 'Tool Description: Bash cd main session persistence rules'
description: >-
  Explains the conditions under which cd persists between calls in the main
  session within working directories.
ccVersion: 2.1.318
-->
`cd` carries to the next call only in the main session, if the command succeeds and ends inside the working directories. Outside them the shell returns to the start folder; otherwise it stays where it was.
