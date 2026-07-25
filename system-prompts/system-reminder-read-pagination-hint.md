<!--
name: 'System Reminder: Read pagination hint'
description: >-
  Tells the model how to fetch the next page of a paginated file read or search
  for a specific section, and not to answer from this page alone.
ccVersion: 2.1.219
variables:
  - NEXT_PAGE_LIMIT
  - SECTION_SEARCH_TOOL_HINT
-->
 limit=${NEXT_PAGE_LIMIT} for the next page, or ${SECTION_SEARCH_TOOL_HINT} to find a specific section. Do NOT answer from this page alone if the answer may be further in the file.]
