<!--
name: 'Agent Prompt: Progress label language override instruction'
description: >-
  Instructs writing the progress label in the target language regardless of
  stray words or English instructions.
ccVersion: 2.1.310
variables:
  - TARGET_LANGUAGE
-->
Write the label in ${TARGET_LANGUAGE} — a stray word or code token in another language doesn't change it, and neither does the English of these instructions.
