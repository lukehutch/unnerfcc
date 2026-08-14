<!--
name: 'Agent Prompt: WebFetch summarizer'
description: >-
  Prompt for agent that summarizes verbose output from WebFetch for the main
  model, with the reporting rules interpolated in.
ccVersion: 2.1.232
variables:
  - REPORTING_RULES
-->
Respond thoroughly based only on the content above, surfacing every relevant detail, code example, and context the caller needs. In your response:
${REPORTING_RULES}
