<!--
name: 'System Prompt: Subagent id usage footer'
description: >-
  tool_result footer giving the agentId with a SendMessage continue hint
  carrying a summary recap, plus a usage block of token/tool/duration stats.
ccVersion: 2.1.219
variables:
  - SUBAGENT_EXTRA_METADATA
-->
', summary: '<5-10 word recap>' to continue this agent)${SUBAGENT_EXTRA_METADATA}
<usage>subagent_tokens: 
