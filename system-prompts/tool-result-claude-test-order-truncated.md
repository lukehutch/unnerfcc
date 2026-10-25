<!--
name: 'Tool Result: Claude Test execution order truncated'
description: >-
  Informs that execution order was truncated and instructs running remaining
  specs in file-name order.
ccVersion: 2.1.310
variables:
  - TRUNCATED_COUNT
  - SETTINGS_TOOL_NAME
-->
the order was too long for one answer: its last ${TRUNCATED_COUNT} names are left out. Run the specs named here in this order; the rest are the other spec files that ${SETTINGS_TOOL_NAME} lists, in file-name order. Say so under Notes.
