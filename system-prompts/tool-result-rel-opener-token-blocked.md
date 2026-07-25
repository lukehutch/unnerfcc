<!--
name: 'Tool Result: rel opener token rejected'
description: >-
  Publish-time rejection telling the model to remove the opener token from rel
  because it hands the opened page a window.opener handle back, and that
  noopener noreferrer is acceptable.
ccVersion: 2.1.219
-->
Remove the opener token from rel — it hands the opened page a window.opener handle back to this one. rel="noopener noreferrer" is fine.
