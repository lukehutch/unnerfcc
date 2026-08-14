<!--
name: 'Tool Result: Account session list incomplete'
description: >-
  Appends a note to the agent listing warning that account sessions could not
  all be enumerated, so those rows carry no [ref] and are not addressable by
  name yet.
ccVersion: 2.1.231
variables:
  - SESSION_LISTING
-->
${SESSION_LISTING}
  (account session list incomplete just now — those rows carry no [ref] and are not messageable by name until a later listing completes)
