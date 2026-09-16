<!--
name: 'Tool Result: Whiteboard page code mismatch (publish)'
description: >-
  Warns that the whiteboard page code does not match this skill's version and
  instructs publishing the clean rebuild immediately.
ccVersion: 2.1.273
variables:
  - DETAILS
-->
page code: not this skill's own (${DETAILS}) — an older version of the skill may have written it, or someone republished the board with altered page code; this output is the clean rebuild, so publish it now and tell the user in one plain line
