<!--
name: 'Tool Description: App drag'
description: >-
  Describes dragging between coordinates in an application window in the
  background with app_drag.
ccVersion: 2.1.270
variables:
  - BACKGROUND_NOTE
-->
Drag from `coordinate` to `to_coordinate` inside the specified app's window without bringing the app to the foreground. Use for text selection, moving items in a list, or drawing. Both points are in the same window-local coordinate space as `app_click`.${BACKGROUND_NOTE}
