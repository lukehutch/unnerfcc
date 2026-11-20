<!--
name: 'Tool Result: Style SVG path constraints'
description: >-
  Model-facing validation error specifying that SVG path data must start with M,
  be whole, and stay within length and coordinate limits.
ccVersion: 2.1.329
variables:
  - FIELD_PATH
-->
${FIELD_PATH} is SVG path data that starts with M, whole, of at most 16384 characters and no number past 1000000
