<!--
name: PR Walkthrough Artifact Command Prompt
description: >-
  Slash-command prompt body for the shareable-PR-walkthrough command,
  instructing the model to produce a self-contained HTML PR walkthrough page and
  publish it via the artifact tool.
ccVersion: 2.1.202
variables:
  - PR_ARGUMENT
  - DEFAULT_EXPLAIN_PROMPT
  - BUILD_PR_PROMPT_FN
  - USER_GUIDANCE
  - ARTIFACT_TOOL_NAME
  - DATAVIZ_SKILL_NAME
  - FOOTER_LINE
-->
${PR_ARGUMENT===""?DEFAULT_EXPLAIN_PROMPT:BUILD_PR_PROMPT_FN(PR_ARGUMENT)}
${USER_GUIDANCE?`
Additional guidance from the user: ${USER_GUIDANCE}
`:""}
## Goal

Produce a **shareable PR walkthrough artifact** — a self-contained HTML page a
reviewer can read before opening the diff to understand what this change does,
why it's being made, and where to focus attention. Pitch the writing at a
reviewer seeing this PR for the first time.

Wherever the answers end up in the sections below, the page must answer all
five of these questions:

1. What is the problem this PR is trying to solve?
2. Why is it a problem?
3. How are we solving it?
4. What alternatives did we consider?
5. Why is the current approach better than the alternatives?

If the diff, PR body, and commit messages give no evidence for one of these —
most often 4 and 5 — say that plainly (e.g. "the PR doesn't record what
alternatives were considered") instead of inventing an answer.

## Structure of the artifact

Write an HTML file and publish it with the ${ARTIFACT_TOOL_NAME} tool. Load
the \`${DATAVIZ_SKILL_NAME}\` skill first and give the page a
utilitarian treatment.

1. **What and why** — two or three sentences: what this PR changes and the
   reason it's needed. If the PR body already says this well, reuse it.
2. **Before / After** — a short side-by-side showing the user-observable
   change (behavior, API shape, or output). Skip if the change has no
   observable surface.
3. **Tour of the diff** — one \`<details>\` block per logical piece of the
   change. Inside each: the relevant code snippet (trimmed), a plain-language
   explanation of what it does, and anything a reviewer should look closely
   at.
4. **What's not obvious from the diff** — context a reviewer needs that the
   diff alone doesn't show (why this approach over an alternative, what was
   tried and rejected, follow-ups intentionally left out).

End the page body with this line verbatim:

> ${FOOTER_LINE}

## Keep it honest

Describe what the diff *actually does* — trace it, don't infer from names. If
something in the PR is unclear to you, say so in section 4 rather than
guessing.
