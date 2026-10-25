<!--
name: 'Tool Result: Artifact publish edits total length exceeded'
description: >-
  Rejects edits when the total character count exceeds the limit, advising use
  of Edit tool instead.
ccVersion: 2.1.310
variables:
  - MAX_CHARACTERS
-->
old_str and new_str add up to more than ${MAX_CHARACTERS} characters over all the edits; make a change that large with Edit and publish without edits
