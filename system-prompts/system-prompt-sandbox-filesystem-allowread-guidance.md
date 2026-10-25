<!--
name: 'System Prompt: Sandbox Filesystem AllowRead Guidance'
description: >-
  Guidance on configuring sandbox.filesystem.allowRead in settings to grant
  access to user profile tools.
ccVersion: 2.1.310
variables:
  - PROFILE_READ_ACTION
  - SETTINGS_FILE_PATH
-->
${PROFILE_READ_ACTION}, which makes the profile readable apart from credential stores, or they can add that tool's own folder to `sandbox.filesystem.allowRead` in ${SETTINGS_FILE_PATH} (as `~/...`, which in a settings file is the user's home, or a full path with backslashes doubled) and restart Claude Code (an administrator's policy can overrule the entry); sandboxed commands can then read and run everything in it
