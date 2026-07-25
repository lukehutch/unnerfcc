<!--
name: 'Tool Description: Edit Read Before Edit'
description: >-
  Edit tool description fragment requiring the read tool be used at least once
  before editing a file.
ccVersion: 2.1.219
variables:
  - READ_TOOL_NAME
-->

- You must use your `${READ_TOOL_NAME}` tool at least once in the conversation before editing. This tool will error if you attempt an edit without reading the file.
