<!--
name: 'Tool Result: Shader for loop static bounds requirement'
description: >-
  Model-facing shader validation error requiring a for loop's start, end, and
  step to be statically known or bounded by pointerCount.
ccVersion: 2.1.329
-->
a for loop needs its start, end and step known while reading, as in for (let i = 0; i < 8; i++), or an end of pointerCount: loop to a fixed end and break early
