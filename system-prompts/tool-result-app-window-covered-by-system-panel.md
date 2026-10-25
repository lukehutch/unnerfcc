<!--
name: 'Tool Result: App Window Covered by System Panel'
description: >-
  Warns that a system modal panel is blocking interaction with an application
  window.
ccVersion: 2.1.310
-->
Note: a system panel (e.g. a share or sign-in sheet owned by macOS, not this app) is covering part of this window — the HATCHED region marks where it sits. Its contents are intentionally not shown, and the whole window is blocked while it's up: clicks and typing here are refused. Call app_release and use the display-scope tools to work the panel, or ask the user to complete or dismiss it.

