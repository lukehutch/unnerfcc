<!--
name: 'Tool Result: Artifact subpath link not fetched'
description: >-
  Explains that a link targets an artifact supporting file and directs to
  list_files/read_file.
ccVersion: 2.1.251
variables:
  - ARTIFACT_TOOL_NAME
-->
 — this link names a path inside the artifact, which is one of its published files rather than its page, so nothing was fetched. List the artifact's files with the ${ARTIFACT_TOOL_NAME} tool (action: "list_files", url) and save one locally with action: "read_file" (url, path); fetch the artifact URL itself for the page.
