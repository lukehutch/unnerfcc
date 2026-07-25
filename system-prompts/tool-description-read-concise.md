<!--
name: 'Tool Description: Read (concise)'
description: >-
  Concise Read tool description — absolute path, default line limit, and image,
  PDF, and notebook handling.
ccVersion: 2.1.219
variables:
  - DEFAULT_READ_LINE_LIMIT
  - LINE_LIMIT_QUALIFIER
  - PARTIAL_READ_GUIDANCE_LINE
  - ADDITIONAL_READ_GUIDANCE_LINE
-->
Reads a file from the local filesystem.

- `file_path` must be an absolute path.
- Reads up to ${DEFAULT_READ_LINE_LIMIT} lines by default${LINE_LIMIT_QUALIFIER}.
${PARTIAL_READ_GUIDANCE_LINE}
${ADDITIONAL_READ_GUIDANCE_LINE}
- Reads images (PNG, JPG, …) and presents them visually.
