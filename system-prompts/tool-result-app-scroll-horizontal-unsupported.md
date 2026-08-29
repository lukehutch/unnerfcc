<!--
name: 'Tool Result: app_scroll horizontal unsupported'
description: Error result stating horizontal scrolling is unsupported in background mode.
ccVersion: 2.1.251
-->
app_scroll only supports vertical (dy). Horizontal scroll is not implemented for the background AX path — use display-scope `scroll`, or scroll vertically and rely on the app's auto-scroll.
