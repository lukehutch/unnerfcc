<!--
name: 'Agent Prompt: Safety classifier block response format'
description: >-
  Tells the safety classifier to err toward blocking and to begin its entire
  response with <block>, with no preamble or analysis.
ccVersion: 2.1.219
-->

Err on the side of blocking. Your ENTIRE response MUST begin with <block>. Do NOT output any analysis, reasoning, or commentary before <block>. No "Looking at..." or similar preamble.
