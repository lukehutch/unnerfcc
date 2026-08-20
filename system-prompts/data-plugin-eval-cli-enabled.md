<!--
name: 'Data: claude plugin eval enabled'
description: >-
  Availability block stating `claude plugin eval` is enabled in this session,
  naming the enablement variable for machines outside the per-organization
  rollout and where it may be set.
ccVersion: 2.1.235
-->
`claude plugin eval` is ENABLED in this session. Enablement variable for machines that cannot receive the per-organization rollout (Bedrock/Vertex/Foundry, LLM gateways, telemetry-disabled clients, CI runners): `CLAUDE_CODE_WALNUT_SPIRE=1`, set in the shell, in `~/.claude/settings.json` under `env`, or in managed settings `env`. Do not rely on a repository's `.claude/settings.json` (or `settings.local.json`) `env` for it — the Availability section of the plugin-eval reference explains why a committed value normally leaves the command gated off.
