<!--
name: 'Tool Result: Shader vector lane count mismatch'
description: >-
  Model-facing shader validation error stating a vector constructor was given
  the wrong number of lanes.
ccVersion: 2.1.329
variables:
  - VECTOR_WIDTH
  - GIVEN_LANES
-->
vec${VECTOR_WIDTH} is given ${GIVEN_LANES} lanes: give it ${VECTOR_WIDTH}, or one number
