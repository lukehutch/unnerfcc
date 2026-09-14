<!--
name: 'Tool Description: App key'
description: >-
  Describes sending keyboard shortcuts to an application window in the
  background with app_key.
ccVersion: 2.1.270
variables:
  - BACKGROUND_NOTE
-->
Send a keyboard shortcut to the element at (x, y) in one window of a granted application. Only return, escape, backspace, delete, and cmd+a are supported in the background — arbitrary ⌘-shortcuts require the menu bar (use the display-scope key tool for those).${BACKGROUND_NOTE}
