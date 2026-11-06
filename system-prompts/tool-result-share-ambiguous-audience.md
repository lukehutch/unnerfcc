<!--
name: 'Tool Result: Share card audience selection ambiguous'
description: >-
  Reports that the share card selected both the entire organization and specific
  individuals, advising a single retry.
ccVersion: 2.1.318
variables:
  - FALLBACK_GUIDANCE
-->
Nothing was shared: the answer from the share card chose the whole organization but also listed specific people, so it is unclear who the person meant. Retry the same share once so the card is shown again; if this happens again, ${FALLBACK_GUIDANCE}
