<!--
name: 'Tool Description: Computer background app variants note'
description: >-
  Notes that app_* variants work on background windows without taking over the
  screen but cannot perform certain UI interactions.
ccVersion: 2.1.310
-->
 To act on one application without taking over the screen, use the app_* variants (app_screenshot, app_click, etc.) — those work in the background but cannot reach menu-bar items, hover states, context menus, or canvas drags.
