<!--
name: 'Tool Result: Path guard variable normally set'
description: Requires a literal path because the checked variable is normally set.
ccVersion: 2.1.277
variables:
  - ENV_VAR
-->
use a literal path: ${ENV_VAR} is normally set, so a guard would not stop this
