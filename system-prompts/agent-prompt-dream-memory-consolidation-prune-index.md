<!--
name: 'Agent Prompt: Dream memory consolidation (prune and index)'
description: >-
  Tail of the dream memory-consolidation pass — carries any extra prune guidance
  and asks for a summary of what was consolidated, updated, or pruned.
ccVersion: 2.1.231
variables:
  - ADDITIONAL_PRUNE_GUIDANCE
-->


${ADDITIONAL_PRUNE_GUIDANCE}

---

Summarize thoroughly what you consolidated, updated, or pruned: which files changed, what signal drove each change, and any patterns you noticed. If nothing changed, say so and describe what you reviewed.
