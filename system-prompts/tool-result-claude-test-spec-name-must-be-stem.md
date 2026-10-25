<!--
name: 'Tool Result: Claude Test spec name must be stem'
description: >-
  Instructs using the spec file stem without .md extension or heading, retrying,
  or recording BLOCKED.
ccVersion: 2.1.310
variables:
  - PROGRESS_TOOL_NAME
-->
. Name a spec by its file's stem: "home" for .claude-test/specs/home.md, as the "order" of ${PROGRESS_TOOL_NAME} gives it; never its heading, and no ".md". Call again with the stem. If that is the stem you were given, record this spec as BLOCKED, put this answer in its Why cell, and copy it into its log.
