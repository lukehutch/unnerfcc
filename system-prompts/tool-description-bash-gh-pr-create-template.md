<!--
name: 'Tool Description: Bash gh pr create template'
description: >-
  Template command block showing the model how to open a pull request with `gh
  pr create` and a heredoc body.
ccVersion: 2.1.219
-->
```
gh pr create --title "Short, descriptive title" --body "$(cat <<'EOF'
## Summary
