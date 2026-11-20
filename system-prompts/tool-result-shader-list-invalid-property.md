<!--
name: 'Tool Result: Shader list invalid property access'
description: >-
  Model-facing shader validation error stating a list has only .length, [i], and
  for...of rather than the accessed property.
ccVersion: 2.1.329
variables:
  - PROPERTY_NAME
-->
a list has no .${PROPERTY_NAME}: it has .length, [i] and for...of
