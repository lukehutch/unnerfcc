<!--
name: 'Tool Result: MCP listing truncated due to size limit'
description: >-
  Informs the model that an MCP listing exceeded byte or character normalization
  limits and was truncated.
ccVersion: 2.1.310
variables:
  - SKIPPED_COUNT
  - TOTAL_COUNT
  - ITEMS_NOUN
-->
Skipped the last ${SKIPPED_COUNT} of ${TOTAL_COUNT} ${ITEMS_NOUN}: the listing is too large. Only about the first 16 MB of a listing is used (less if it has many small values), and only about 1 million characters that are costly to normalize: combining marks, full-width forms, emoji and the like anywhere, and a tool's or prompt's name that is not all ASCII. The server must list fewer or shorter ${ITEMS_NOUN} to get them back.
