<!--
name: 'Tool Result: Propose skills chat ineligible'
description: >-
  Informs the model that skill proposals are unavailable in this chat and
  advises showing the skill text directly for copying.
ccVersion: 2.1.325
variables:
  - CHAT_RESTRICTION_REASON
-->
The user was not shown this proposal, and nothing was saved. This chat ${CHAT_RESTRICTION_REASON}, so this tool offers nothing from it as a skill. Trying again in this chat gives the same result. The skill's text can still be shown to the user in this chat, where they can copy it.
