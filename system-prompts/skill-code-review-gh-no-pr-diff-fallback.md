<!--
name: 'Skill: Code Review gh pr diff fallback command'
description: >-
  Model-facing fallback command to run if the session's gh CLI lacks the pr diff
  subcommand.
ccVersion: 2.1.329
variables:
  - FALLBACK_GH_COMMAND
-->

Some sessions have a gh with no `pr diff` command. Only if gh itself says so, run this in its place, alone too:

```
${FALLBACK_GH_COMMAND}
```
