<!--
name: 'Tool Result: Claude Test form not submitted after typing'
description: >-
  Reports that the run value was typed but no subsequent action submitted the
  form.
ccVersion: 2.1.310
variables:
  - RUN_VALUE
  - DETAILS
-->
this run's value, ${RUN_VALUE}, was typed, but no page action came after it (a click, key press, navigation, wait or more typing; snapshots and screenshots only read the page)${DETAILS}, so the form was never submitted
