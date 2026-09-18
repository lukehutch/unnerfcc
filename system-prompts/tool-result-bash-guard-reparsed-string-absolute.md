<!--
name: 'Tool Result: Reparsed command requires literal absolute path'
description: >-
  Requires a literal absolute path because commands inside quoted strings or
  eval are reparsed, bypassing quotes.
ccVersion: 2.1.277
variables:
  - COMMAND_EXPRESSION
-->
use a literal absolute path: this ${COMMAND_EXPRESSION} is parsed again before it runs (it is inside a quoted string or after eval), so a pasted guard's quotes would not protect it
