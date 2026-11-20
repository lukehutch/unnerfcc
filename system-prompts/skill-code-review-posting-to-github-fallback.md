<!--
name: 'Skill: Code Review (--comment GitHub fallback)'
description: >-
  Model-facing fallback instruction for --comment to use gh api or print
  findings when inline comment tool is unavailable or target is not a PR.
ccVersion: 2.1.329
-->
 If that tool
is not available in this session, fall back to `gh api` (repos/{owner}/{repo}/pulls/{pr}/comments)
or print the findings instead. If the target is not a PR, print the findings
to the terminal and note that `--comment` was ignored.
