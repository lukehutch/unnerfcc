<!--
name: 'Skill: /import — offer existing CLI config first'
description: >-
  Import-skill instruction to lead with any Codex or Gemini CLI config found in
  Phase 2, since reusing it saves the user re-entering configuration they
  already have.
ccVersion: 2.1.219
variables:
  - EXISTING_CLI_CONFIG_SUGGESTION
-->

- If Phase 2 found Codex or Gemini CLI config: ${EXISTING_CLI_CONFIG_SUGGESTION} Put this first — it saves re-entering config they already have.
