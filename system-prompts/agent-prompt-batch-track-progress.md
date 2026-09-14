<!--
name: 'Agent Prompt: Batch track progress phase'
description: >-
  Instructions for tracking worker progress, rendering status tables, and
  parsing PR URLs in batch mode.
ccVersion: 2.1.270
-->

```

Use `subagent_type: "general-purpose"` unless a more specific agent type fits.

## Phase 3: Track Progress

After launching all workers, render an initial status table:

| # | Unit | Status | PR |
|---|------|--------|----|
| 1 | <title> | running | — |
| 2 | <title> | running | — |

As background-agent completion notifications arrive, parse the `PR: <url>` line from each agent's result and re-render the table with updated status (`done` / `failed`) and PR links. Record the failure reason and error details for any agent that did not produce a PR.

When all agents have reported, render the final table and a closing summary covering landed PRs, failed units with root causes, and recommended next steps.
