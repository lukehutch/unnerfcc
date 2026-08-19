<!--
name: 'Skill: Artifact call contract typedefs unavailable'
description: >-
  Tells the artifact skill that the served `mcp` type definitions could not be
  extracted for this invocation and forbids writing capability calls from
  memory, since the served definitions are the authority.
ccVersion: 2.1.235
-->
**Call contract.** The served `mcp` type definitions could not be extracted for this invocation — invoking this skill again retries. Do not write `mcp` capability calls from memory; the served definitions are the authority.
