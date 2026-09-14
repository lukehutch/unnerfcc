<!--
name: 'Tool Parameter: App window ID'
description: >-
  Parameter description for CGWindowID targeting a specific window in app_*
  background tools.
ccVersion: 2.1.270
-->
CGWindowID from app_list_windows or from a previous app_screenshot result. If omitted, defaults to the window you most recently app_screenshot-ed for this app (or the app's main window if you haven't screenshotted yet). Pass a different id to switch windows — there is no separate switch-window tool; targeting is per-call via this parameter.
