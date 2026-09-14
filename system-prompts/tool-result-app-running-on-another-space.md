<!--
name: 'Tool Result: App running on another space'
description: >-
  Informs that app is running on another Space and explains background
  capability and fallback.
ccVersion: 2.1.270
variables:
  - OFF_SPACE_FALLBACK
-->
 is running on another Space. The app_* tools can app_screenshot it there, and for most apps can click/type into it in the background; if an action refuses because the window is off-Space, ${OFF_SPACE_FALLBACK}.
