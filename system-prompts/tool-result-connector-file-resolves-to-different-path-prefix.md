<!--
name: 'Tool Result: Connector file resolves to different path prefix'
description: >-
  Rejects sending a file because its path resolves via symlink or alias to a
  different physical path.
ccVersion: 2.1.321
variables:
  - FILE_PATH
-->
Cannot send ${FILE_PATH}: it resolves to another path
