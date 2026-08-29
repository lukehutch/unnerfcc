<!--
name: 'Tool Description: app_type'
description: Describes the app_type tool for entering text into a background app window.
ccVersion: 2.1.251
variables:
  - BACKGROUND_NOTE
-->
Type text into one window of a granted application without bringing it to the front. Target by coordinate, element_index, or target: 'focused' (writes to the app's currently-focused text element — use this for Pages/Keynote-style apps where the document body is a canvas). Replaces the current selection. Only target TEXT fields: typing at a pop-up button, dropdown, or other non-text control is refused (the text would land in whatever field has keyboard focus instead).${BACKGROUND_NOTE}
