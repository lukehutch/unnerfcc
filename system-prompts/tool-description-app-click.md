<!--
name: 'Tool Description: App click'
description: >-
  Describes clicking inside an application window in the background with
  app_click.
ccVersion: 2.1.270
variables:
  - BACKGROUND_NOTE
-->
Click within one window of a granted application without bringing it to the front. Target by coordinate (pixels in app_screenshot's full-resolution coordinate frame), by element_index (from the AX summary in the last app_screenshot), or by target: 'focused' (the app's own focused element). If the result says unsupported(canvas), retry with element_index or target instead of coordinate. Menu-presenting controls (pop-up / pull-down dropdowns, toolbar action-gear menus) and right-click context menus are refused (opening them would bring the app to the front); use app_menu for the equivalent menu bar command instead.${BACKGROUND_NOTE}
