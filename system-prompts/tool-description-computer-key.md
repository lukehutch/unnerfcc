<!--
name: 'Tool Description: Computer key'
description: >-
  Describes pressing keys or shortcuts and details the systemKeyCombos grant
  requirement.
ccVersion: 2.1.310
variables:
  - SHORTCUT_GUIDANCE
-->
Press a key or key combination (e.g. "return", "escape", "cmd+a", "ctrl+shift+tab"). ${SHORTCUT_GUIDANCE} System-level combos (quit app, switch app, lock screen) require the `systemKeyCombos` grant — without it they return an error. All other combos work.
