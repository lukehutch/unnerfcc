<!--
name: 'Tool Result: cd refused fixed working directory suffix'
description: >-
  Informs the model that cd is refused anywhere in a command as the working
  directory remains fixed.
ccVersion: 2.1.310
variables:
  - WORKING_DIRECTORY
-->
`, which is refused wherever it sits in a command, as an argument too: the working directory stays ${WORKING_DIRECTORY} for the whole session.
