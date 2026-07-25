<!--
name: 'System Prompt: Auto-mode permissions block'
description: >-
  Wraps the session's auto-mode permission configuration in a
  cc_automode_permissions block for the model.
ccVersion: 2.1.219
variables:
  - AUTO_MODE_PERMISSIONS
-->
<cc_automode_permissions>
${AUTO_MODE_PERMISSIONS}
</cc_automode_permissions>
