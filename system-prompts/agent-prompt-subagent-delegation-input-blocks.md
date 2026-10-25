<!--
name: 'Agent Prompt: Subagent delegation input blocks'
description: >-
  Input XML blocks containing CLAUDE.md, skills, and agent definitions for
  delegation classification.
ccVersion: 2.1.310
variables:
  - CLAUDE_MD
  - SKILLS
  - AGENTS
-->
<claude_md>
${CLAUDE_MD}
</claude_md>
<skills>
${SKILLS}
</skills>
<agents>
${AGENTS}
</agents>
