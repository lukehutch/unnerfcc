<!--
name: 'Tool Result: Write clipboard blocked for click-tier app'
description: Blocks write_clipboard when a click-tier app is frontmost.
ccVersion: 2.1.270
variables:
  - EXTRA_NOTE
-->
" is a tier-"click" app and currently frontmost. write_clipboard is blocked because the next action would clear the clipboard anyway — a UI Paste button in this app cannot be used to inject text. Bring a tier-"full" app forward before writing to the clipboard.${EXTRA_NOTE}
