<!--
name: 'System Prompt: Subagent prompting wrapper with hypothesis rule'
description: >-
  Model-facing wrapper combining subagent prompting sections with guidance not
  to hand subagents a leading hypothesis.
ccVersion: 2.1.329
variables:
  - SUBAGENT_PROMPT_INTRO
  - SUBAGENT_DELEGATION_GUIDANCE
-->
${SUBAGENT_PROMPT_INTRO}${SUBAGENT_DELEGATION_GUIDANCE}

An agent handed your hypothesis tends to return it confirmed. For an independent check, give it the problem, not your conclusion.
