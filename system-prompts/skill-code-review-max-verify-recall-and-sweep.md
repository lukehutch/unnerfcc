<!--
name: 'Skill: Code Review max verify recall mode and sweep'
description: >-
  Model-facing Phase 2/3 wrapper stating recall mode keeps any non-REFUTED
  finding and interpolates verify and sweep instructions.
ccVersion: 2.1.329
variables:
  - VERIFY_PHASE_INSTRUCTIONS
  - SWEEP_AND_OUTPUT_INSTRUCTIONS
-->

${VERIFY_PHASE_INSTRUCTIONS}
This is recall mode — a single non-REFUTED vote carries the finding. Do NOT
drop on uncertainty.

${SWEEP_AND_OUTPUT_INSTRUCTIONS}
