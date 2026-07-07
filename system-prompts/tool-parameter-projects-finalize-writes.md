<!--
name: Projects finalize_plan writes parameter
description: >-
  Describe() for the projects/design-system tool input_schema 'writes'
  parameter, serialized into the model's tool list; model-facing.
ccVersion: 2.1.202
-->
finalize_plan: exact paths or glob patterns that will be written. `*` matches within a single segment, `**` matches any depth (e.g. `ui_kits/acme/**/*.html`). Max 3 `*`/`**` wildcards per pattern and max 256 entries — use broader globs to cover more files rather than enumerating paths.
