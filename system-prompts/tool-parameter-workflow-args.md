<!--
name: Workflow args parameter
description: >-
  Workflow tool inputSchema param description for the args field passed to the
  script; model-facing as part of the Workflow tool's input_schema.
ccVersion: 2.1.202
-->
Optional input value exposed to the script as the global `args`, verbatim. Pass arrays/objects as actual JSON values, NOT as a JSON-encoded string — a stringified list breaks `args.filter`/`args.map` in the script. Use for parameterized named workflows (e.g. a research question).
