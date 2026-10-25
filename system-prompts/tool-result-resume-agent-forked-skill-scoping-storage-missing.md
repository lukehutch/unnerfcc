<!--
name: 'Tool Result: Resume Agent Forked Skill Scoping Storage Missing'
description: >-
  Refuses resuming the agent because a diskless session lacks the storage
  backend to check forked-skill scoping.
ccVersion: 2.1.310
variables:
  - AGENT_ID
-->
Agent ${AGENT_ID} cannot be checked for a forked-skill scoping record: this diskless session has no storage backend or key for it. Refusing to resume it.
