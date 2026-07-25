<!--
name: 'System Prompt: /security-review not a git repo'
description: >-
  security-review slash-command prompt returned when cwd is not a git
  repository, instructing the model to tell the user
ccVersion: 2.1.219
variables:
  - CURRENT_WORKING_DIRECTORY
-->
Tell the user: /security-review needs to run inside a git repository, but the current working directory (`${CURRENT_WORKING_DIRECTORY}`) is not one.

If the repository is in a subdirectory, `cd` into it first and then re-run /security-review.

If this is a self-hosted runner session created without a `git_repository` source, either add one at session creation so the runner clones it and sets the working directory, or `cd` into the cloned repo before running the review.
