<!--
name: 'Tool Result: Permission denied in unattended turn'
description: >-
  Model-facing denial notice explaining that no user may be present to answer an
  approval prompt and instructing to continue unblocked work and state what is
  waiting.
ccVersion: 2.1.329
variables:
  - DENIAL_REASON
  - WAITING_ACTION
-->
${DENIAL_REASON}, and the user has not written since something other than their message opened a turn, so nobody may be here to give one. You can go on with work that needs no approval. The user reads your reply when they come back: if it says what is waiting, they can tell you whether to go ahead, and after their message you can make the call again. What is waiting: ${WAITING_ACTION}
