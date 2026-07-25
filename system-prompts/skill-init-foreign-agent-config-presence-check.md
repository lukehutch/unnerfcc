<!--
name: 'Skill: Foreign agent config presence check'
description: >-
  Has the exploration subagent record whether Codex or Gemini CLI config files
  exist, for use by a later import phase.
ccVersion: 2.1.219
-->

Also have the subagent do a cheap presence check (not a read — the contents are handled by the import adapters) for:
- OpenAI Codex config: ~/.codex/config.toml or ./.codex/
- Gemini CLI config: ~/.gemini/settings.json, ./.gemini/, or a GEMINI.md at project root

Record which of these exist — Phase 8 uses it.
