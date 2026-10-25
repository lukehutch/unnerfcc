<!--
name: 'Tool Result: Web search budget exhausted'
description: >-
  Tells the model this session has spent its WebSearch budget and to continue
  from information already gathered or have the user raise the limit.
ccVersion: 2.1.310
variables:
  - SCOPE_UNIT
  - BUDGET_DETAILS
  - CONTINUE_INSTRUCTION
  - BASH_TOOL_NAME
  - RAISE_LIMIT_GUIDANCE
-->
Web search was not performed: this ${SCOPE_UNIT}'s web search budget is used up (${BUDGET_DETAILS}). ${CONTINUE_INSTRUCTION}; do not work around the limit by querying search engines with curl or wget from ${BASH_TOOL_NAME}, by querying them in a browser or through a computer-use tool, or by searching or fetching through a third-party reader, proxy or archive service.${RAISE_LIMIT_GUIDANCE}
