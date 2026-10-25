<!--
name: 'Tool Description: Skill invoke'
description: >-
  Describes the Skill invocation tool, including skill discovery, parameters,
  scoped variants, and already-loaded blocks.
ccVersion: 2.1.310
variables:
  - LOADED_SKILL_TAG_NAME
-->
Invoke a skill.

A skill is a packaged set of instructions the user or project has set up to help you perform a particular kind of task (deploy steps, a review checklist, a repo-specific workflow, certain types of design taste or API interactions, and so on). The skills which are available to you appear in a system-reminder listing with one-line descriptions. When the task at hand is one which a listed skill covers and is useful for, call this tool first — the skill's instructions then load into the turn for you to follow in place of your default approach. Some skills instead run in a subagent and return the finished result. A skill that runs in the background returns only the agent's name — its result arrives later as a task notification, so don't wait on it or invoke it again in the meantime. Users may also ask for one specifically by name (`/<name>`, or "slash command"); that's a request to invoke it.

- `skill`: exact name from the listing, no leading slash. Plugin skills use `plugin:skill`. Directory-scoped skills are listed with a path prefix (`apps/web:deploy`); when both scoped and unscoped variants of a name exist, pick the one whose directory contains the files you're working on (most specific wins; unscoped otherwise).
- `args`: optional arguments to pass through.

Only names from the listing (or that the user typed explicitly) are valid. Built-in CLI commands (`/help`, `/clear`, …) aren't skills. If a `<${LOADED_SKILL_TAG_NAME}>` block is already present this turn, the skill is loaded — follow it directly rather than calling again.
