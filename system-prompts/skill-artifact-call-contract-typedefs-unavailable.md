<!--
name: 'Skill: Artifact call contract typedefs unavailable'
description: >-
  Tells the artifact skill that the served window.claude type definitions could
  not be extracted and forbids writing mcp calls from memory.
ccVersion: 2.1.219
variables:
  - TRAILING_GUIDANCE
-->
**Call contract.** The served `window.claude` type definitions could not be extracted for this invocation — invoking this skill again retries. Do not write `window.claude.mcp` calls from memory; the served definitions are the authority. ${TRAILING_GUIDANCE}
