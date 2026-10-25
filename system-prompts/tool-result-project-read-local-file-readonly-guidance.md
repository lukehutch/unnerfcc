<!--
name: 'Tool Result: Project read local file is read-only guidance'
description: >-
  Explains that downloaded local_file paths are read-only and details how to
  copy and save modifications.
ccVersion: 2.1.310
variables:
  - READ_TOOL_NAME
  - SEARCH_TOOL_NAME
-->
local_file is for reading only: read the parts you need with ${READ_TOOL_NAME}'s offset and limit, or search it with ${SEARCH_TOOL_NAME}. Edits to it never reach the project, and project_write rejects it as local_path. To change the document or make a file from it, run `cat /path/of/local_file > new-name` in the working directory, where new-name is a name that no file there has, and work on that file. To save a change, call project_write with the document's path and that file as local_path. If the document is an upload such as a PDF, that saves a new text document and leaves the upload as it is.
