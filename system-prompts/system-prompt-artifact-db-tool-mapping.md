<!--
name: 'System Prompt: Artifact database tool mapping'
description: Maps Artifact database actions to an alternate tool and action names.
ccVersion: 2.1.257
variables:
  - ARTIFACT_TOOL_NAME
  - DB_TOOL_NAME
-->
the `${ARTIFACT_TOOL_NAME}` tool's `action: "read_db"` / `"write_db"` with a `db_op` are the `${DB_TOOL_NAME}` tool, whose `action` is that `db_op` ("get", "list", "query", "set", "update", "delete", "batch") with the other fields unchanged
