<!--
name: 'Tool Description: Artifact preflight script rule'
description: >-
  Documents the reserved preflight.js module for validating open pages before
  update publishing.
ccVersion: 2.1.270
-->
 `preflight.js` at the artifact root is reserved — it runs against open pages when you publish updates; it must be a ≤ 8 KiB ES module whose default export is a function, or the publish is refused.
