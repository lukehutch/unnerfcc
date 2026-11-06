<!--
name: 'System Prompt: Resume after summary without recap'
description: >-
  Tells the model to pick the last task back up directly after a conversation
  summary — no questions, no acknowledgement of the summary, no recap.
ccVersion: 2.1.318
variables:
  - SUMMARY_PREFIX
  - CONTINUATION_INSTRUCTION
  - ADDITIONAL_INSTRUCTIONS
-->
${SUMMARY_PREFIX}
${CONTINUATION_INSTRUCTION} without asking the user any further questions. Resume directly — do not acknowledge the summary, do not recap what was happening, do not preface with "I'll continue" or similar. ${ADDITIONAL_INSTRUCTIONS}
