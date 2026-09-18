<!--
name: 'Tool Result: Script single-quoting guidance for positional parameters'
description: >-
  Advises single-quoting inline sh -c scripts or using literal absolute paths to
  prevent shell positional parameter expansion.
ccVersion: 2.1.277
variables:
  - GUARD_SYNTAX
-->
${GUARD_SYNTAX} (in an inline `sh -c` script, single-quote the script so this shell does not expand the positional) or use a literal absolute path
