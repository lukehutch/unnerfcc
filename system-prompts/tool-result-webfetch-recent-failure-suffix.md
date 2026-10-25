<!--
name: 'Tool Result: WebFetch recent failure suffix'
description: >-
  Suffix advising to proceed without the recently failed page unless an explicit
  retry was requested.
ccVersion: 2.1.310
variables:
  - WEB_FETCH_TOOL_NAME
-->
), and a second fetch this soon nearly always fails the same way. Carry on without this page and say that it could not be read. If another try was asked for in so many words, call ${WEB_FETCH_TOOL_NAME} again with the same url.
