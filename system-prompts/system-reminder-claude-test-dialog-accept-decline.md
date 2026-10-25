<!--
name: 'System Reminder: Claude Test dialog accept decline phrasing'
description: >-
  Instructs adjusting dialog phrasing when the tool dialog uses Accept and
  Decline buttons instead of checkboxes.
ccVersion: 2.1.310
variables:
  - TOOL_NAME
-->
The dialog of the tool ${TOOL_NAME} has no box to tick in this session: it ends in Accept and Decline, and Accept alone allows. Where the run skill's words about that dialog mention a box, a tick or Space, leave that out: write "To allow one, choose Accept." in place of "To allow one, press Space to tick the box, then choose Accept.", and "To allow it, choose Accept." in place of "Press Space to tick the box, then choose Accept.". The install questions keep their box.
