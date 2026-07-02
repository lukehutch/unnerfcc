<!--
name: 'Agent Prompt: /review-pr slash command'
description: >-
  System prompt for reviewing a GitHub pull request — gather the PR diff via gh
  pr view/diff (the PR diff is the only review scope)
ccVersion: 2.1.196
variables:
  - AGENT_PROMPT_REVIEW_PR_SLASH_COMMAND_VAR_0
  - AGENT_PROMPT_REVIEW_PR_SLASH_COMMAND_VAR_1
  - AGENT_PROMPT_REVIEW_PR_SLASH_COMMAND_VAR_2
  - AGENT_PROMPT_REVIEW_PR_SLASH_COMMAND_VAR_3
-->
Review target: GitHub pull request \`${AGENT_PROMPT_REVIEW_PR_SLASH_COMMAND_VAR_0}\`.

Gather this target's diff with (instead of any local \`git diff\`):
1. \`gh pr view ${AGENT_PROMPT_REVIEW_PR_SLASH_COMMAND_VAR_0} --json title,body,author,baseRefName,headRefName,state,additions,deletions,changedFiles,labels\` for context
2. \`gh pr diff ${AGENT_PROMPT_REVIEW_PR_SLASH_COMMAND_VAR_0}\` for the unified diff

The PR's diff is the only review scope — local working-tree changes are out of scope. When an angle needs surrounding code, Read the files in this checkout if it matches the PR's branch, otherwise fetch file contents via \`gh\`.
${AGENT_PROMPT_REVIEW_PR_SLASH_COMMAND_VAR_1?`
Additional instructions from the user: ${AGENT_PROMPT_REVIEW_PR_SLASH_COMMAND_VAR_1}
`:""}
${AGENT_PROMPT_REVIEW_PR_SLASH_COMMAND_VAR_2(AGENT_PROMPT_REVIEW_PR_SLASH_COMMAND_VAR_3)}
## Present the review

After the final phase, do not reply with the raw JSON findings array. Present a readable review: a 2-3 sentence overview of what the PR does, then the surviving findings most-severe first as \`file:line — summary (failure scenario)\`, or a note that nothing survived verification.
