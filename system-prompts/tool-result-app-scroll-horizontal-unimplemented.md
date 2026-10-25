<!--
name: 'Tool Result: App Scroll Horizontal Unimplemented'
description: >-
  Informs that horizontal scrolling is not implemented for background app
  scrolling.
ccVersion: 2.1.310
-->
app_scroll only supports vertical (dy). Horizontal scroll is not implemented for the background AX path — use display-scope `scroll`, or scroll vertically and rely on the app's auto-scroll.
