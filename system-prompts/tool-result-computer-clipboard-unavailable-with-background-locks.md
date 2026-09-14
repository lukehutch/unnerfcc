<!--
name: 'Tool Result: Clipboard unavailable with background locks'
description: Explains clipboard access is unavailable while holding background app locks.
ccVersion: 2.1.270
variables:
  - OPERATION
-->
Clipboard ${OPERATION} is unavailable while you hold background app-locks — the user keeps using their machine (and clipboard) while you work in the background. If this work needs the clipboard: app_release your locks, then use the display-scope tools — the next display-scope call takes over the screen with the user's approval.
