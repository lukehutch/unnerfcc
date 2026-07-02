<!--
name: 'System Reminder: PostToolUse Hook Modified File'
description: >-
  hook_additional_context injected when a PostToolUse hook (e.g. a formatter)
  modified a file after the model's edit
ccVersion: 2.1.178
variables:
  - SYSTEM_REMINDER_POSTTOOLUSE_HOOK_MODIFIED_FILE_VAR_0
-->
PostToolUse hook modified ${SYSTEM_REMINDER_POSTTOOLUSE_HOOK_MODIFIED_FILE_VAR_0} after your edit (likely a formatter). Your next Edit will not fail with a stale-file error, but if its old_string targets a region the hook reformatted, Read the file first.
