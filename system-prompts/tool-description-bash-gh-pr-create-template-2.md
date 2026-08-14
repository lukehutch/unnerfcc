<!--
name: 'Tool Description: Bash gh pr create template'
description: >-
  Template command block showing the model how to open a pull request with `gh
  pr create` and a heredoc body.
ccVersion: 2.1.231
-->
```
gh pr create --title "the pr title" --body "$(cat <<'EOF'
## Summary
