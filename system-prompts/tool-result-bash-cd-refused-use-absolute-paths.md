<!--
name: 'Tool Result: cd refused use absolute paths'
description: >-
  Informs the model that cd commands are refused and absolute paths should be
  used instead.
ccVersion: 2.1.310
variables:
  - CD_ARGUMENT
  - WORKING_DIRECTORY
-->
It contains `${CD_ARGUMENT}`, and the working directory stays ${WORKING_DIRECTORY} for the whole session: run the command with absolute paths instead of cd.
