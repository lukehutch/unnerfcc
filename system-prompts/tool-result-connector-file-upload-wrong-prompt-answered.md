<!--
name: 'Tool Result: Connector file upload upload prompt was not answered'
description: >-
  Explains that file sending was aborted because a plugin or other prompt was
  answered instead of the upload prompt.
ccVersion: 2.1.321
variables:
  - INSTRUCTION_CLAUSE
-->
No file was sent: the question answered for this call was not the upload prompt that says what the call sends and to which connector (a plugin's permission check may have asked in its place), and only an Allow on that prompt sends files. ${INSTRUCTION_CLAUSE}
