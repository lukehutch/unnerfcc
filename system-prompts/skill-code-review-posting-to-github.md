<!--
name: 'Skill: Code Review (--comment GitHub posting)'
description: >-
  Appended to the code-review prompt when --comment is passed; instructs posting
  each finding as an inline PR comment
ccVersion: 2.1.329
-->


## Posting to GitHub (--comment)

The `--comment` flag was passed. After producing the findings list, if the
review target is a GitHub PR, post each finding as an inline PR comment via
`mcp__github_inline_comment__create_inline_comment` (one call per finding;
include a suggestion block only when it fully fixes the issue).
