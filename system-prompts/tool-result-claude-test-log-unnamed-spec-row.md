<!--
name: 'Tool Result: Claude Test unnamed spec row in log'
description: >-
  Explains how to fix a verdict row that names no spec file when unrecorded
  PASSes exist.
ccVersion: 2.1.310
-->
it names no spec file, and there are more such rows than recorded PASSes that no row names: write its Spec cell as the spec's own # heading, or, when no spec file is behind the row, make it BLOCKED
