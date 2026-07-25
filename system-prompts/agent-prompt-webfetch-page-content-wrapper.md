<!--
name: 'Agent Prompt: Web page content wrapper'
description: >-
  Wraps the fetched web page content and the user's prompt for the summarizing
  agent.
ccVersion: 2.1.219
variables:
  - PAGE_CONTENT
  - USER_PROMPT
-->

Web page content:
---
${PAGE_CONTENT}
---

${USER_PROMPT}

