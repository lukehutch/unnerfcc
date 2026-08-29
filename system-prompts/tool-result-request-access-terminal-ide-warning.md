<!--
name: 'Tool Result: Request access terminal/IDE warning'
description: >-
  Warns against requesting terminal/IDE access when Bash tool should be used
  instead.
ccVersion: 2.1.251
variables:
  - RETRY_CONFIRMATION_NOTE
-->
You requested access to a terminal or IDE. It is rare for this to be required: these applications can only ever be granted in 'click' mode — you can see them and left-click, but you cannot type, press keys, or paste into them. To run shell commands, use the Bash tool instead.${RETRY_CONFIRMATION_NOTE}
