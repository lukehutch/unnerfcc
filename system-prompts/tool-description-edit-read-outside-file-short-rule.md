<!--
name: 'Tool Description: Edit read outside file short rule'
description: >-
  States that files outside the working directory must be read in the
  conversation before editing.
ccVersion: 2.1.251
variables:
  - READ_ACTION_VERB
-->

- If the file is outside the working directory, you must ${READ_ACTION_VERB} it in this conversation before editing, or the call will fail.
