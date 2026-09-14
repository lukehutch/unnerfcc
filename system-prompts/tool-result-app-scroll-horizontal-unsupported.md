<!--
name: 'Tool Result: App scroll horizontal unsupported'
description: Informs that horizontal scroll is unsupported in background app_scroll.
ccVersion: 2.1.270
-->
app_scroll only supports vertical (dy). Horizontal scroll is not implemented for the background AX path — use display-scope `scroll`, or scroll vertically and rely on the app's auto-scroll.
