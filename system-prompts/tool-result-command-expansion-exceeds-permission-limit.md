<!--
name: 'Tool Result: Command expansion exceeds permission check limit'
description: >-
  Model-facing error refusing a command whose variables and substitutions expand
  beyond the permission check's length limit.
ccVersion: 2.1.329
-->
This command's variables and substitutions expand to more text than the permission check reads, so it was not run. Use fewer or shorter ones, or put the long text in a file.
