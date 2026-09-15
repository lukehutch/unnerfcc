<!--
name: 'Tool Parameter: Artifact auto_open REPL guidance'
description: >-
  Advises omitting auto_open when populating an artifact via the AppifactRepl
  tool so content fills live.
ccVersion: 2.1.272
-->
When you will fill it through the AppifactRepl tool instead, omit `auto_open`: those writes never open the page, so it opens when created and fills in front of the user as the REPL writes.
