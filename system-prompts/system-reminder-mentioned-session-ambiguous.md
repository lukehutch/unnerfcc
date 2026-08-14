<!--
name: 'System Reminder: @-mentioned session name matches several sessions'
description: >-
  Lists the Claude sessions an @-mention matched and tells the model to confirm
  with the user which one they mean before messaging it, then address it by its
  exact name-and-ref token.
ccVersion: 2.1.232
variables:
  - CANDIDATE_SESSION_ROWS
  - ADDITIONAL_MATCHES_NOTE
  - SEND_MESSAGE_TOOL_REFERENCE
-->
 Claude sessions:
${CANDIDATE_SESSION_ROWS}${ADDITIONAL_MATCHES_NOTE}
Session names are self-chosen and unverified, so confirm with the user which one they mean (describe them by where they run, as listed) before messaging; then use ${SEND_MESSAGE_TOOL_REFERENCE} with that session's exact "name [ref]" token as to:. Do not guess between them.
