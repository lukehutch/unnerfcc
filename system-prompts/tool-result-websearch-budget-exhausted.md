<!--
name: 'Tool Result: Web search budget exhausted'
description: >-
  Tells the model this session has spent its WebSearch budget and to continue
  from information already gathered or have the user raise the limit.
ccVersion: 2.1.219
variables:
  - SEARCHES_USED
  - MAX_SEARCHES
-->
Web search was not performed: this session has used its web search budget (${SEARCHES_USED} of ${MAX_SEARCHES} WebSearch calls). Continue with the information already gathered instead of issuing more searches. If more searches are genuinely needed, ask the user to raise CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION.
