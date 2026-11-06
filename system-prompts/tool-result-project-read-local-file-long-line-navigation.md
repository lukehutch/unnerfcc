<!--
name: 'Tool Result: Project read local file long line navigation guidance'
description: >-
  Explains tools and patterns for paging and searching local_file when lines are
  too long for standard read operations.
ccVersion: 2.1.318
variables:
  - READ_TOOL_NAME
  - GREP_TOOL_NAME
  - BASH_TOOL_NAME
-->
. One of its lines is too long for ${READ_TOOL_NAME} to page through, because ${READ_TOOL_NAME}'s offset and limit count lines. ${READ_TOOL_NAME} with no offset or limit gives only the first part of the file. ${READ_TOOL_NAME} with an offset and limit gives whole lines, or an error if those lines do not fit. The file is too large for project_read to return inline. ${GREP_TOOL_NAME} shows a line or a match of over 500 characters as [Omitted long matching line]. With output_mode `content`, `-o` true and a pattern such as `.{0,200}term.{0,200}`, ${GREP_TOOL_NAME} shows each match of term with up to 200 characters on each side. In ${BASH_TOOL_NAME}, `grep -ob 'term' /path/of/local_file | head` gives the byte offset of each match of term, counted from 0. `tail -c +START /path/of/local_file | head -c 20000` gives 20000 bytes from byte START, counted from 1: START is an offset plus 1, or any number from 1 to size_bytes.
