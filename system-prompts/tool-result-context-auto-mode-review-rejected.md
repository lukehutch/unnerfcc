<!--
name: 'Tool Result: Context auto mode safety review unapproved'
description: >-
  Explains that auto mode safety review did not approve the context report,
  causing context inspection methods to throw.
ccVersion: 2.1.318
variables:
  - METHOD_NAME
-->
.${METHOD_NAME}: auto mode's safety review did not approve this context's report (it flagged the report or could not review it), so result(), state.lastText and tail() on this context throw from now on. If the context ran in the background, its report is in a <task-notification> from it, with any note auto mode added; read that note before you act on the report. Start a new context for more work.
