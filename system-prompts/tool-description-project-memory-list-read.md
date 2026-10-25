<!--
name: 'Tool Description: Project memory list and read'
description: >-
  Describes project_memory_list and project_memory_read tools for reading
  project memory files.
ccVersion: 2.1.310
variables:
  - READ_TOOL_NAME
-->
- `project_memory_list` — list the project's memory files (what Claude has remembered for this project across chats) with sizes and dates. Memory is separate from the docs above and this tool cannot write it.
- `project_memory_read` — read one memory file by `path` (as listed by `project_memory_list`). Small files return inline; large ones are written to a local file whose path is returned (read it with the ${READ_TOOL_NAME} tool). Read memory on demand when it is relevant, not every turn. Memory is read once per session: a file changed by another chat after that is not seen until a new session.
