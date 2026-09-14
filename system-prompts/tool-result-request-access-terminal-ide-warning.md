<!--
name: 'Tool Result: Request access to terminal or IDE warning'
description: Warns about terminal and IDE grant limitations and directs to the Bash tool.
ccVersion: 2.1.270
variables:
  - CONFIRMATION_NOTE
-->
You requested access to a terminal or IDE. It is rare for this to be required: these applications can only ever be granted in 'click' mode — you can see them and left-click, but you cannot type, press keys, or paste into them. To run shell commands, use the Bash tool instead.${CONFIRMATION_NOTE}
