<!--
name: 'Tool Description: Artifact preflight.js Reserved'
description: >-
  Explains constraints and requirements for the reserved preflight.js module in
  an artifact.
ccVersion: 2.1.270
-->
 `preflight.js` at the artifact root is reserved: it runs against open pages when Claude publishes updates, and it must be a JavaScript module of at most 8 KiB whose default export is a function, or the publish is refused.
