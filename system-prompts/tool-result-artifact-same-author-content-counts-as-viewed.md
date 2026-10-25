<!--
name: 'Tool Result: Same Author Content Counts as Viewed'
description: >-
  Informs the model that the live version has identical author content, so it
  counts as viewed and can be republished.
ccVersion: 2.1.310
variables:
  - REFUSAL_REASON
  - BASE_CONTENT_SOURCE
  - CONDITIONAL_PUBLISH_NOTE
  - ACTION_GUIDANCE
  - UNTRUSTED_CONTENT_WARNING
  - SAVED_PATH_NOTE
  - EXTRA_NOTE
-->
${REFUSAL_REASON} Compared with ${BASE_CONTENT_SOURCE}, though, that version's page has the same author content — publishing yours would lose nothing of it — so it now counts as viewed: publish again and it goes through${CONDITIONAL_PUBLISH_NOTE}.
${ACTION_GUIDANCE}.${UNTRUSTED_CONTENT_WARNING}${SAVED_PATH_NOTE}${EXTRA_NOTE}
