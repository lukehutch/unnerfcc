<!--
name: 'Tool Result: Start task file rejected by Files API'
description: Informs the model that the Files API did not accept the specified file.
ccVersion: 2.1.293
variables:
  - FILE_NAME
  - ERROR_DETAILS
-->
The Files API did not accept "${FILE_NAME}". ${ERROR_DETAILS} Start the task without this file, or tell the user.
