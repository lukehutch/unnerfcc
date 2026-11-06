<!--
name: 'Tool Result: Bash find -exec plus syntax advice'
description: >-
  Explains find command {} + syntax and batching behavior compared to semicolon
  termination.
ccVersion: 2.1.318
-->
that find replaces with all the found paths at once when the clause ends in `{} +` (do not put `{}` right after an option that takes a value, or end the clause with `\;` so that each run gets one path)
