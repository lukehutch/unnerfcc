<!--
name: 'Tool Result: App running minimized reachable'
description: >-
  Informs that minimized window will be un-minimized on first background
  click/type.
ccVersion: 2.1.251
variables:
  - WINDOW_STATE
-->
 is running (window is ${WINDOW_STATE}). The app_* tools reach it — the first app_click or app_type will un-minimize it without bringing it to the front. Use app_list_windows for the window_id.
