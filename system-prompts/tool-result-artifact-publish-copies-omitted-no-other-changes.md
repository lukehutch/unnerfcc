<!--
name: 'Tool Result: Publish copies omitted with no other changes'
description: >-
  Explains that publishing was aborted because only omitted copies were changed
  and advises resending when the cause clears.
ccVersion: 2.1.310
variables:
  - REASON_PREFIX
  - EXPLANATION
  - ADDITIONAL_NOTE
-->
${REASON_PREFIX}, and nothing else in this publish would have changed the artifact. ${EXPLANATION} Send a copy again only when the reason it was left out no longer applies. ${ADDITIONAL_NOTE}
