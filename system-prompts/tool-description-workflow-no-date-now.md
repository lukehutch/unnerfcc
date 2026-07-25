<!--
name: 'Tool Description: Workflow scripts have no Date.now()'
description: >-
  States that Date.now() and new Date() are unavailable in workflow scripts
  because they break resume, and that timestamps must be stamped after the run
  or passed via args.
ccVersion: 2.1.219
-->
Date.now() / new Date() are unavailable in workflow scripts (breaks resume). Stamp results after the workflow returns, or pass timestamps via args.
