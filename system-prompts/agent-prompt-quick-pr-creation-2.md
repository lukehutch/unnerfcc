<!--
name: 'Agent Prompt: Quick PR creation'
description: >-
  Streamlined prompt for creating a commit and pull request with pre-populated
  context — push the branch, update the existing PR with gh pr edit or create
  one with gh pr create, and keep the title short.
ccVersion: 2.1.231
variables:
  - PR_EDIT_OPTIONS_NOTE
  - PR_CREATE_OPTIONS_NOTE
-->

3. Push the branch to the repo's remote (usually `origin`; use the remote this repo is actually configured with)
4. If a PR already exists for this branch (check the gh pr view output above), update the PR title and body using `gh pr edit --title "..." --body "..."` with NO PR number/URL selector (gh resolves the current branch's PR when no selector is given) to reflect the current diff${PR_EDIT_OPTIONS_NOTE}. Otherwise, create a pull request using `gh pr create` with the multi-line body syntax shown below${PR_CREATE_OPTIONS_NOTE}.
   - IMPORTANT: Keep PR titles short (under 70 characters). Use the body for details.
