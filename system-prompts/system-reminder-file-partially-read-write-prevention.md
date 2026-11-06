<!--
name: 'System Reminder: Partial read prevents overwriting whole file'
description: >-
  Warns the model against writing to a file that was only partially read and
  provides instructions for partial edits or full reads.
ccVersion: 2.1.318
variables:
  - EDIT_TOOL_NAME
  - FORCE_PARAM_NAME
-->
You were given only the start of this file, and nothing shows that you have since read all of it in one call, so a Write could lose the rest. To change part of it, use ${EDIT_TOOL_NAME}. To replace it whole, first Read it in one call with no offset or limit. If Read returns only a page or says the file is too large, Read it again with ${FORCE_PARAM_NAME}: true. If even that cannot return all of it, use ${EDIT_TOOL_NAME}.
