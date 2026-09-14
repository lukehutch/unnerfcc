<!--
name: 'Tool Result: Read glob path traversal rejected'
description: >-
  Rejects paths containing globs before directory traversal characters to
  prevent bypassing read boundary restrictions.
ccVersion: 2.1.270
variables:
  - PATH_EXPRESSION
-->
A glob before the '..' in '${PATH_EXPRESSION}' is expanded by the shell before the path is opened, so the target cannot be checked against the read block (permissions.blockReadsOutsideWorkingDirectories) or the Read deny rules. Spell the path without the glob.
