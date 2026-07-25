<!--
name: 'System Prompt: Project settings indirection gate blocked'
description: >-
  Reports that `.claude` failed the indirection gate so its settings.local.json
  was deliberately not probed, and forbids reading or rewriting anything under
  that path.
ccVersion: 2.1.219
-->

#### Project `.claude/settings.local.json` — autoMode keys (found content, NOT pre-approved config)
`.claude` itself failed the indirection gate (it is not a real directory — e.g. committed as a symlink), so whether a settings.local.json exists behind it was deliberately not probed. Tell the user; do not read, resolve, or rewrite anything under this path.
