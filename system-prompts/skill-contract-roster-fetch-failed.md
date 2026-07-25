<!--
name: 'Skill: Capability roster fetch failed'
description: >-
  Appends a note that the current contract's capability roster could not be
  fetched and that invoking the skill again retries the contract service.
ccVersion: 2.1.219
variables:
  - PRECEDING_SKILL_CONTENT
-->
${PRECEDING_SKILL_CONTENT}

_(The current contract's capability roster could not be fetched; the contract service may be unreachable — invoking this skill again retries.)_
