<!--
name: 'Skill: Workshop pages forbid MathML'
description: >-
  Forbids <math> on a workshop page because MathML subtrees are mutation-XSS
  carriers, requiring formulas rendered as text or SVG instead.
ccVersion: 2.1.219
-->
<math> is not allowed on a workshop page — MathML subtrees are serialization-hazard surfaces (mutation-XSS carriers); render formulas as text or SVG.
