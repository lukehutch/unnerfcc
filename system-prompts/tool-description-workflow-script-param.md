<!--
name: 'Tool Description: Workflow script param'
description: >-
  Describes the self-contained workflow script string parameter for the Workflow
  tool.
ccVersion: 2.1.178
-->
Self-contained workflow script. Must begin with `export const meta = { name, description, phases }` (pure literal, no computed values) followed by the script body using agent()/parallel()/pipeline()/phase().
