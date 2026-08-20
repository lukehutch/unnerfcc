<!--
name: 'Agent Prompt: Web page content wrapper'
description: >-
  Wraps the fetched web page content, the caller's prompt, and the response
  instructions for the summarizing agent.
ccVersion: 2.1.232
variables:
  - PAGE_CONTENT
  - USER_PROMPT
  - RESPONSE_INSTRUCTIONS
-->

Web page content:
---
${PAGE_CONTENT}
---

${USER_PROMPT}

${RESPONSE_INSTRUCTIONS}
