<!--
name: 'Tool Description: Clipboard write blocked at click tier'
description: >-
  computer-use error explaining that write_clipboard is blocked while a
  tier-"click" app is frontmost and to bring a tier-"full" app forward first.
ccVersion: 2.1.219
variables:
  - TRAILING_GUIDANCE
-->
" is a tier-"click" app and currently frontmost. write_clipboard is blocked because the next action would clear the clipboard anyway — a UI Paste button in this app cannot be used to inject text. Bring a tier-"full" app forward before writing to the clipboard.${TRAILING_GUIDANCE}
