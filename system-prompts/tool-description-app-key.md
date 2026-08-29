<!--
name: 'Tool Description: app_key'
description: >-
  Describes the app_key tool for sending keyboard shortcuts to background app
  elements.
ccVersion: 2.1.251
variables:
  - BACKGROUND_NOTE
-->
Send a keyboard shortcut to the element at (x, y) in one window of a granted application. Only return, escape, backspace, delete, and cmd+a are supported in the background — arbitrary ⌘-shortcuts require the menu bar (use the display-scope key tool for those).${BACKGROUND_NOTE}
