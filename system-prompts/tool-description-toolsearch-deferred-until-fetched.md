<!--
name: 'Tool Description: ToolSearch Deferred Until Fetched'
description: >-
  ToolSearch description fragment: until fetched, a deferred tool has no schema;
  fetch with select:<name> before calling.
ccVersion: 2.1.178
-->
 Until fetched, only the name is known — there is no parameter schema, so calling the tool fails with InputValidationError. When any instruction, system reminder, or other tool's description names a deferred tool, fetch it with query "select:<name>" before calling it.
