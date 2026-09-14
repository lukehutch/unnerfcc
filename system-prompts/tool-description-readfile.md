<!--
name: 'Tool Description: ReadFile'
description: Tool description for reading files
ccVersion: 2.1.270
variables:
  - DEFAULT_READ_LINE_LIMIT
  - PARTIAL_READ_GUIDANCE_LINE
  - ADDITIONAL_READ_GUIDANCE_LINE
-->
Reads a file from the local filesystem. You can access any file directly by using this tool.
Assume this tool is able to read all files on the machine. If the User provides a path to a file assume that path is valid. It is okay to read a file that does not exist; an error will be returned.

Usage:
- The file_path parameter must be an absolute path, not a relative path
- By default, it reads up to ${DEFAULT_READ_LINE_LIMIT} lines starting from the beginning of the file
${PARTIAL_READ_GUIDANCE_LINE}
${ADDITIONAL_READ_GUIDANCE_LINE}
- This tool allows Claude Code to read images (eg PNG, JPG, etc). When reading an image file the contents are presented visually as Claude Code is a multimodal LLM.
