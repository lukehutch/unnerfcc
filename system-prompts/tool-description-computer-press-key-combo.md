<!--
name: 'Tool Description: Computer press key combination'
description: >-
  Describes pressing keys or key chords and notes the systemKeyCombos grant
  requirement.
ccVersion: 2.1.270
variables:
  - KEY_DETAILS
-->
Press a key or key combination (e.g. "return", "escape", "cmd+a", "ctrl+shift+tab"). ${KEY_DETAILS} System-level combos (quit app, switch app, lock screen) require the `systemKeyCombos` grant — without it they return an error. All other combos work.
