<!--
name: 'Tool Description: App screenshot'
description: >-
  Describes capturing a window screenshot and interactive element summary with
  app_screenshot.
ccVersion: 2.1.270
variables:
  - BACKGROUND_NOTE
-->
Capture a screenshot of one window of a granted application, regardless of whether it is visible, minimized, or on another Space. Returns the image plus a compact summary of interactive elements (role, position, title) within the window. The (x, y) coordinates you pass to app_click etc. are ALWAYS pixels in this screenshot's full-resolution coordinate frame (reported with every scaled app_screenshot; equal to the image's pixels for unscaled ones).${BACKGROUND_NOTE}
