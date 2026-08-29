<!--
name: 'Tool Description: app_list_windows'
description: >-
  Describes the app_list_windows tool for listing windows of a granted
  application.
ccVersion: 2.1.251
variables:
  - BACKGROUND_NOTE
-->
List the windows of one granted application. Returns [{window_id, title, is_main, is_minimized, bounds}]. Use the window_id with app_screenshot and the app_* action tools.${BACKGROUND_NOTE}
