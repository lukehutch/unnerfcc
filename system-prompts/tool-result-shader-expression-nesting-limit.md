<!--
name: 'Tool Result: Shader expression nesting depth limit'
description: >-
  Model-facing shader validation error stating code nests deeper than allowed
  and advising moving parts into consts or functions.
ccVersion: 2.1.329
variables:
  - MAX_DEPTH
-->
this nests more than ${MAX_DEPTH} deep: move some of it into consts or functions
