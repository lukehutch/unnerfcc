<!--
name: 'Tool Description: app_drag'
description: >-
  Describes the app_drag tool for background drag actions inside an application
  window.
ccVersion: 2.1.251
variables:
  - BACKGROUND_NOTE
-->
Drag from `coordinate` to `to_coordinate` inside the specified app's window without bringing the app to the foreground. Use for text selection, moving items in a list, or drawing. Both points are in the same window-local coordinate space as `app_click`.${BACKGROUND_NOTE}
