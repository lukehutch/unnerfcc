<!--
name: 'Tool Result: Call blocked with no way to ask user'
description: >-
  Informs the model that the tool call did not run because this session had no
  way to ask the user, advising to ask how to proceed rather than retrying.
ccVersion: 2.1.329
variables:
  - REASON_DETAIL
-->
This call did not run: it needs the user's answer, and this session had no way to ask. ${REASON_DETAIL} Ask the user how to proceed rather than retrying.
