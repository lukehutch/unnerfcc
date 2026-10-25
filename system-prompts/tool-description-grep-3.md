<!--
name: 'Tool Description: Grep'
description: >-
  Tool description for ripgrep-based content search with regex, glob, type
  filters, and output modes.
ccVersion: 2.1.310
variables:
  - BASH_TOOL_NAME
-->
Content search built on ripgrep. Prefer this over `grep`/`rg` via ${BASH_TOOL_NAME}, because its results integrate with the permission UI and file links in Claude Code.

- Full regex syntax (e.g. "log.*Error", "function\s+\w+"). Ripgrep, not grep, so escape literal braces (`interface\{\}`).
- Filter with `glob` (e.g. "**/*.tsx") or `type` (e.g. "js", "py", "rust").
- `output_mode`: "content" (matching lines), "files_with_matches" (paths only, default), or "count".
- `multiline: true` for patterns that span lines.
