<!--
name: 'Skill: Code Review target diff command'
description: >-
  Model-facing instruction specifying the exact standalone command to fetch a
  named review target's diff.
ccVersion: 2.1.329
variables:
  - TARGET_DESCRIPTION
  - DIFF_COMMAND
-->
That target is ${TARGET_DESCRIPTION}, and its own diff is this review's scope. Get the diff with this command, run alone, with nothing chained, piped or redirected:

```
${DIFF_COMMAND}
```

It replaces every `git diff` command that the instructions below give for gathering the diff. This checkout may be on another branch
