<!--
name: 'Tool Result: REPL script too costly to parse'
description: >-
  Model-facing REPL error rejecting a script that is too complex or deeply
  nested to parse and advising extracting inner parts into variables or
  functions.
ccVersion: 2.1.329
-->
This script is too costly to parse: it nests default values, destructuring or for heads too deeply, nests a lot of code too deeply, or has a regular expression with too many named groups. Move the inner parts into variables or functions of their own.
