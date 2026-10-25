<!--
name: 'Tool Result: Request Access Terminal or IDE Guidance'
description: >-
  Warns about click-only IDE/terminal restrictions and directs shell execution
  to the Bash tool.
ccVersion: 2.1.310
variables:
  - CONFIRMATION_INSTRUCTION
-->
You requested access to a terminal or IDE. It is rare for this to be required: these applications can only ever be granted in 'click' mode — you can see them and left-click, but you cannot type, press keys, or paste into them. To run shell commands, use the Bash tool instead.${CONFIRMATION_INSTRUCTION}
