<!--
name: 'Tool Result: Script double backtick template hint'
description: >-
  Hints that consecutive backticks prematurely end template literals and suggest
  alternative string quoting.
ccVersion: 2.1.318
-->
Hint: two backticks in a row end one template literal and tag the next, so a string gets called. Text that contains backticks or `${` is safer in a '…' or "…" string, or read from a file.
