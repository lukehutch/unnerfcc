<!--
name: 'System Prompt: Code review GitLab glab command instructions'
description: >-
  Details how to format and post GitLab merge request notes via glab or fall
  back to terminal output.
ccVersion: 2.1.257
-->

(every finding with its file:line, the issue, and the suggested fix). glab has no single verb for line-anchored
comments; those require `glab api projects/:id/merge_requests/:iid/discussions`,
so post the general note unless the user asks for inline threads. If glab is
not available in this session, print the findings instead. If the target is
not an MR, print the findings to the terminal and note that `--comment` was
ignored.
