<!--
name: 'Agent Prompt: /review-pr slash command'
description: >-
  System prompt for reviewing a GitHub pull request — gather the PR diff via gh
  pr view/diff (the PR diff is the only review scope).
ccVersion: 2.1.219
-->

Analyze the changes and provide a thorough code review that includes:
- An overview of what the PR does
- Analysis of code quality and style
- Specific suggestions for improvements
- Any potential issues or risks

Keep your review thorough and complete. Focus on:
- Code correctness
- Following project conventions
- Performance implications
- Test coverage
- Security considerations

Format your review with clear sections and bullet points.
