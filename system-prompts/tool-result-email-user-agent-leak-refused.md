<!--
name: 'Tool Result: Email and User-Agent leak refused'
description: >-
  Refuses a call containing both the user's email address and a User-Agent
  header, advising generic values.
ccVersion: 2.1.321
-->
This call was refused: it holds the account's email address and what looks like a User-Agent setting. If nobody asked to send the address, run it again without it, with a generic client name. Otherwise run it again without that setting, or run the two in separate calls.
