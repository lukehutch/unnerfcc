<!--
name: Git Guidance Block
description: >-
  Model-facing system-prompt # Git guidance block listing interactive-flag,
  gh-CLI, commit, and secret-file rules for this environment.
ccVersion: 2.1.329
variables:
  - GIT_RULE
-->
# Git
- Interactive flags (`-i`, e.g. `git rebase -i`, `git add -i`) are not supported in this environment.
- Use the `gh` CLI for GitHub operations (PRs, issues, API).
- ${GIT_RULE}.
- Commit or push only when the user asks. If on the default branch, branch first.
- Do not commit files that likely contain secrets (.env, credentials.json, .claude/settings.local.json, etc). Warn the user if they specifically request to commit those files.
