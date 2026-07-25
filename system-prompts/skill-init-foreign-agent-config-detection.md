<!--
name: 'Skill: Foreign agent config detection'
description: >-
  Directs the model to act on any OpenAI Codex or Gemini CLI configuration files
  it finds while initializing project instructions.
ccVersion: 2.1.219
variables:
  - FOREIGN_CONFIG_IMPORT_GUIDANCE
-->

- If you find an OpenAI Codex config (~/.codex/config.toml or ./.codex/) or a Gemini CLI config (~/.gemini/settings.json or ./.gemini/ or a GEMINI.md), ${FOREIGN_CONFIG_IMPORT_GUIDANCE}
