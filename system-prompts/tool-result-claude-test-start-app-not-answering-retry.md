<!--
name: 'Tool Result: Claude Test start app nothing answering retry'
description: >-
  Instructs calling the start dialog tool again when nothing answers at the
  expected address.
ccVersion: 2.1.310
variables:
  - START_APP_TOOL
-->
They chose Accept, but the check found nothing there yet. Call ${START_APP_TOOL} once more with the same arguments, in this turn: its dialog opens with "Nothing answers at <address> yet.".
