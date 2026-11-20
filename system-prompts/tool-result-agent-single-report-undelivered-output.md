<!--
name: 'Tool Result: Agent single-report limit undelivered output'
description: >-
  Model-facing tool result explaining that an agent's subsequent output was not
  delivered because it only gets one report until background work finishes.
ccVersion: 2.1.329
variables:
  - RUN_CONTEXT
-->
${RUN_CONTEXT}. Anything it wrote at the end of that run was not delivered, because it gets one report until its background work ends. So the report does not answer the message you sent it.
