<!--
name: 'Tool Result: Clipboard unavailable during background app locks'
description: >-
  Explains that clipboard operations are unavailable while background app locks
  are held.
ccVersion: 2.1.251
variables:
  - OPERATION
-->
Clipboard ${OPERATION} is unavailable while you hold background app-locks — the user keeps using their machine (and clipboard) while you work in the background. If this work needs the clipboard: app_release your locks, then use the display-scope tools — the next display-scope call takes over the screen with the user's approval.
