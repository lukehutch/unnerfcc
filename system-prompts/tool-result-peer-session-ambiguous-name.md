<!--
name: 'Tool Result: Peer session name is ambiguous'
description: >-
  Tells the model the name matches several peer sessions and to re-send with the
  ref, followed by the candidate rows and any lookup caveats.
ccVersion: 2.1.231
variables:
  - CANDIDATE_SESSION_ROWS
  - SESSION_LOOKUP_CAVEATS
-->
 peer session(s). Re-send with the ref:
${CANDIDATE_SESSION_ROWS}${SESSION_LOOKUP_CAVEATS}
