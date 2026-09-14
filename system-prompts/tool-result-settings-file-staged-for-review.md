<!--
name: 'Tool Result: Settings file change staged for review'
description: >-
  Informs that edits to Claude Code settings files require manual review via
  /settings-review and the file was not modified.
ccVersion: 2.1.270
variables:
  - SETTINGS_FILE_PATH
-->
Staged for review: ${SETTINGS_FILE_PATH} was NOT modified. Changes to Claude Code settings files made without the owner of this computer approving them in person are held for their review; the owner applies or discards them with /settings-review, and the change takes effect only if they accept it. Do not retry the edit or try to make the same change another way.
