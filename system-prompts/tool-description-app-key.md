<!--
name: 'Tool Description: App Key'
description: >-
  Describes sending supported keyboard shortcuts to an element in a granted
  background application window.
ccVersion: 2.1.310
variables:
  - TRAILER
-->
Send a keyboard shortcut to the element at (x, y) in one window of a granted application. Only return, escape, backspace, delete, and cmd+a are supported in the background — arbitrary ⌘-shortcuts require the menu bar (use the display-scope key tool for those).${TRAILER}
