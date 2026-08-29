<!--
name: 'Tool Parameter: App window_id'
description: >-
  window_id parameter description for targeting specific application windows in
  app_* tools.
ccVersion: 2.1.251
-->
CGWindowID from app_list_windows or from a previous app_screenshot result. If omitted, defaults to the window you most recently app_screenshot-ed for this app (or the app's main window if you haven't screenshotted yet). Pass a different id to switch windows — there is no separate switch-window tool; targeting is per-call via this parameter.
