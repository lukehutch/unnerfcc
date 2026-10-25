<!--
name: 'Tool Parameter: Computer app window_id'
description: Specifies the window ID to target for background window interactions.
ccVersion: 2.1.310
-->
CGWindowID from app_list_windows or from a previous app_screenshot result. If omitted, defaults to the window you most recently app_screenshot-ed for this app (or the app's main window if you haven't screenshotted yet). Pass a different id to switch windows — there is no separate switch-window tool; targeting is per-call via this parameter.
