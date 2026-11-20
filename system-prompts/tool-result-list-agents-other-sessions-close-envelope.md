<!--
name: 'Tool Result: ListAgents other-sessions untrusted close tag'
description: >-
  Closes the nonce-fenced untrusted other-sessions block after listing sessions
  and any truncation notice.
ccVersion: 2.1.329
variables:
  - SESSIONS_LIST
  - TRUNCATION_NOTE
  - NONCE
-->
${SESSIONS_LIST}

${TRUNCATION_NOTE}

</other-sessions nonce="${NONCE}">
