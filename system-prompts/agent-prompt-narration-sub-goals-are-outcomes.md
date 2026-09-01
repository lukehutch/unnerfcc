<!--
name: 'Agent Prompt: Narration sub-goals are outcomes'
description: >-
  Tells the narration prompt that a sub-goal names an outcome the user asked for
  or needs rather than the mechanics of getting there.
ccVersion: 2.1.257
-->
Outcomes the user asked for or needs, never mechanics: not "read foo.ts lines 120-180" but "confirming the retry path is what drops the header"; not "ran the tests" but "tests pass except the resume case". Not the task as a whole, and not a plan for later. Name only files, commands and results that appear in the digest. The running tool calls have no results yet; that is expected, not something to report.
