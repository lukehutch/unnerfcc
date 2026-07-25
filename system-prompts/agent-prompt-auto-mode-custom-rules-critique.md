<!--
name: 'Agent Prompt: Auto-mode custom rules critique'
description: >-
  Gives the reviewing model the auto-mode classifier system prompt plus the
  user's custom permission rules and asks it to critique them.
ccVersion: 2.1.219
variables:
  - CLASSIFIER_SYSTEM_PROMPT
  - USER_CUSTOM_RULES
-->
Here is the full classifier system prompt that the auto mode classifier receives:

<classifier_system_prompt>
${CLASSIFIER_SYSTEM_PROMPT}
</classifier_system_prompt>

Here are the user's custom rules (each section header notes whether they replace or extend the defaults):

${USER_CUSTOM_RULES}
Please critique these custom rules.
