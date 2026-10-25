<!--
name: 'Tool Description: Computer app_list_windows'
description: >-
  Describes listing the windows of a granted application for background
  targeting.
ccVersion: 2.1.310
variables:
  - WINDOW_LIST_GUIDANCE
-->
List the windows of one granted application. Returns [{window_id, title, is_main, is_minimized, bounds}]. Use the window_id with app_screenshot and the app_* action tools.${WINDOW_LIST_GUIDANCE}
