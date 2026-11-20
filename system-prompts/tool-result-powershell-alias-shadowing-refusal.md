<!--
name: 'Tool Result: PowerShell alias shadowing function refusal'
description: >-
  Model-facing error refusing a PowerShell command that defines a function
  shadowed by a built-in alias and instructing to rename it with a Verb-Noun
  name.
ccVersion: 2.1.329
variables:
  - ALIAS_COLLISION_REASON
-->
The command was not run. ${ALIAS_COLLISION_REASON}. PowerShell runs an alias before a function, so a call by such a name runs what the alias names, not the function defined here. Rename the function, for example with a Verb-Noun name, and change every call to the new name. Keeping the name is not safe: after Set-Alias, with an [Alias()] attribute, in a script file or after removing the alias, the built-in can still run. Any command that defines this name is refused.
