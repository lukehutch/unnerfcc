<!--
name: 'Skill: Code Review conditional quoted fallback notice wrapper'
description: >-
  Model-facing wrapper instructing to include the quoted fallback words only
  when the target diff could not be read.
ccVersion: 2.1.329
variables:
  - FALLBACK_INSTRUCTIONS
-->

${FALLBACK_INSTRUCTIONS}

Use the quoted words only where you could not read the diff. Where you did read it, leave them out altogether.

