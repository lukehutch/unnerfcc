<!--
name: 'Tool Description: Computer app_type'
description: >-
  Describes typing text into a background window text element without bringing
  it to front.
ccVersion: 2.1.310
variables:
  - TYPE_FALLBACK_GUIDANCE
-->
Type text into one window of a granted application without bringing it to the front. Target by coordinate, element_index, or target: 'focused' (writes to the app's currently-focused text element — use this for Pages/Keynote-style apps where the document body is a canvas). Replaces the current selection. Only target TEXT fields: typing at a pop-up button, dropdown, or other non-text control is refused (the text would land in whatever field has keyboard focus instead).${TYPE_FALLBACK_GUIDANCE}
