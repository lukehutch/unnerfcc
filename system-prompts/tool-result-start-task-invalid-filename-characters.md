<!--
name: 'Tool Result: Start task invalid filename characters'
description: >-
  Informs the model that a file cannot be attached due to invalid characters in
  its name.
ccVersion: 2.1.310
variables:
  - FILE_NAME
-->
Cannot attach "${FILE_NAME}": a file handed to a task from this session's cloud environment needs a plain name, without a backslash, a control character or a character that changes text direction. Copy or rename it and attach that. 
