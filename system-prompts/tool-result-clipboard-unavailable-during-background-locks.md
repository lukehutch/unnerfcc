<!--
name: 'Tool Result: Clipboard Unavailable During Background Locks'
description: >-
  Explains that clipboard operations are restricted while holding background
  application locks.
ccVersion: 2.1.310
variables:
  - OPERATION
-->
Clipboard ${OPERATION} is unavailable while you hold background app-locks — the user keeps using their machine (and clipboard) while you work in the background. If this work needs the clipboard: app_release your locks, then use the display-scope tools — the next display-scope call takes over the screen with the user's approval.
