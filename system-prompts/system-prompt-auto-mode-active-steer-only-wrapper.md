<!--
name: 'System Prompt: Auto mode active (steer-only wrapper)'
description: >-
  Wraps the auto-mode tool-use instructions under a "While auto mode is active"
  header on turns that only steer the model.
ccVersion: 2.1.222
variables:
  - AUTO_MODE_BASH_FIRST_INSTRUCTIONS
-->
While auto mode is active:

${AUTO_MODE_BASH_FIRST_INSTRUCTIONS}
