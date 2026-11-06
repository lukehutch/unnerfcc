<!--
name: 'Tool Result: Bun shell nothrow hint'
description: >-
  Explains that shell execution throws on non-zero exit and suggests using
  nothrow to inspect exitCode.
ccVersion: 2.1.318
-->
($ throws on a non-zero exit, as Bun.$ does; use (await $`cmd`.nothrow()).exitCode to inspect it instead)
