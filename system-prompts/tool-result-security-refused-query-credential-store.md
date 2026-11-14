<!--
name: 'Tool Result: Security refused querying credential store'
description: >-
  Security error stating that the remote machine forbids cloud sessions from
  querying credential stores.
ccVersion: 2.1.325
variables:
  - MACHINE_NAME
  - COMMAND
-->
${MACHINE_NAME} does not let a cloud session query its credential store (`${COMMAND}`). Nothing was run. Either the command names one of the store's tools or APIs, or it has more quoting or escaping than could be checked for such a name; if it names none, split it into simpler commands.
