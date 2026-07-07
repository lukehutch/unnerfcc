<!--
name: 'Tool Description: Computer Key'
description: >-
  computer-use key tool: press a key or key combination; requires the frontmost
  app to be in the session allowlist and system-level combos to hold the
  systemKeyCombos grant.
ccVersion: 2.1.202
-->
Press a key or key combination (e.g. "return", "escape", "cmd+a", "ctrl+shift+tab"). The frontmost application must be in the session allowlist at the time of this call, or this tool returns an error and does nothing. System-level combos (quit app, switch app, lock screen) require the `systemKeyCombos` grant — without it they return an error. All other combos work.
