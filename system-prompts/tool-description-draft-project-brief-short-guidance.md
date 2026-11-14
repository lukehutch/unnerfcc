<!--
name: 'Tool Description: Draft project brief short usage guidance'
description: >-
  Directs calling the brief-drafting tool once before sending to a project when
  /send-to-project asks for a brief.
ccVersion: 2.1.325
variables:
  - SEND_TO_PROJECT_TOOL_NAME
-->
When the user has just run /send-to-project themselves and the command asks you to draft a brief, use it once, before ${SEND_TO_PROJECT_TOOL_NAME}; in any other turn it refuses.
