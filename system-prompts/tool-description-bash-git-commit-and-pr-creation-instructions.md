<!--
name: 'Tool Description: Bash git commit and PR creation instructions'
description: >-
  Bash-tool git commit + PR creation instructions — the gh pr create heredoc
  example, the forbidden todo/task tools, and returning the PR URL.
ccVersion: 2.1.270
variables:
  - PR_BODY_FOOTER
  - GET_TODO_TOOL_NAME
  - TASK_TOOL_NAME
-->
${PR_BODY_FOOTER}
EOF
)"
</example>

Important:
- DO NOT use the ${GET_TODO_TOOL_NAME} or ${TASK_TOOL_NAME} tools
- Return the PR URL when you're done, so the user can see it

# Other common operations
- View comments on a Github PR: gh api repos/foo/bar/pulls/123/comments
