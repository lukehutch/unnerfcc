<!--
name: 'Tool Description: SendMessage teammate recipients'
description: >-
  Describes recipient options for SendMessage in teammate mode, including
  background main and optional cross-session targets.
ccVersion: 2.1.310
variables:
  - CROSS_SESSION_TARGET_ROWS
-->
| `"researcher"` | Teammate by name |
| `"main"` | The main conversation (background subagents only) |${CROSS_SESSION_TARGET_ROWS}
