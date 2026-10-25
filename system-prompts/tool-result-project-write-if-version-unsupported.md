<!--
name: 'Tool Result: Project write if_version unsupported'
description: >-
  Refuses write because if_version cannot be checked in this session and directs
  writing without it.
ccVersion: 2.1.310
-->
Write refused; nothing in the project was changed. This session cannot check if_version. Call project_read on this path, make your change in the text that it returns, and write again without if_version.
