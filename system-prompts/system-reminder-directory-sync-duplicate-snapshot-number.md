<!--
name: 'System Reminder: Directory sync duplicate snapshot number'
description: >-
  Warns that duplicate snapshot numbers were received and newer user edits may
  be temporarily missing.
ccVersion: 2.1.251
-->
Directory sync: the user's machine sent two different snapshots under the same number (another sync process there); this checkout kept the first and ignored the second, so the user's newest edits may be missing until their machine sends a fresh number. Say so if something the user mentions is not here.
