<!--
name: 'Tool Description: WebFetch URL restrictions and discovery'
description: >-
  Restricts WebFetch to URLs appearing in conversation or search results,
  cautioning against constructed URLs.
ccVersion: 2.1.310
variables:
  - WEBFETCH_TOOL_NAME
  - SEARCH_TOOL_NAME
-->
${WEBFETCH_TOOL_NAME} is for URLs that already appear in this conversation: URLs the person provided, or URLs returned by a prior ${SEARCH_TOOL_NAME} or ${WEBFETCH_TOOL_NAME}. A URL recalled from training or built by editing a seen URL's path may need the person's approval or be rejected; call ${SEARCH_TOOL_NAME} or fetch a linking page instead.

