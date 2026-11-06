<!--
name: 'Tool Result: Git safety empty expansion hazard'
description: >-
  Warns that an unquoted pattern or variable may expand to nothing and shift
  following arguments.
ccVersion: 2.1.318
-->
, which may expand to no word at all (a pattern that matches no file, or an empty value), so the word after it would take its place (quote it, or name the files instead of a pattern)
