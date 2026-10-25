<!--
name: 'Tool Parameter: App Scroll dy'
description: >-
  Explains vertical scroll unit semantics and saturation behavior for
  app_scroll.
ccVersion: 2.1.310
-->
Vertical scroll amount. Positive scrolls toward the bottom, negative toward the top. Each unit is ~5% of the window's full scroll range (it sets the scrollbar value, not pixels), and the result saturates at the top/bottom — use small values like 2-5 and re-screenshot.
