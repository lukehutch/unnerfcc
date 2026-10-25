<!--
name: 'Tool Result: Write Clipboard Blocked Click Tier Frontmost'
description: >-
  Blocks write_clipboard when a click-tier app is frontmost to prevent clipboard
  injection.
ccVersion: 2.1.310
variables:
  - TRAILER
-->
" is a tier-"click" app and currently frontmost. write_clipboard is blocked because the next action would clear the clipboard anyway — a UI Paste button in this app cannot be used to inject text. Bring a tier-"full" app forward before writing to the clipboard.${TRAILER}
