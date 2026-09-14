<!--
name: 'System Reminder: User prefers background control'
description: Informs the model that the user prefers background control via app_* tools.
ccVersion: 2.1.270
-->
The user prefers BACKGROUND control. Use the app_* tools (app_screenshot, app_click, app_type, etc.) so the user can keep working in other apps while you act on the granted ones. Only fall back to the full-screen tools (screenshot, left_click, etc.) when an app_* call returns 'unsupported' and there is no other path — and expect a separate approval dialog when you do.
