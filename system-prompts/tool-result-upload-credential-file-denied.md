<!--
name: 'Tool Result: Upload credential file denied'
description: >-
  Refuses uploading a file that resides in or resembles a credential path
  without explicit user action.
ccVersion: 2.1.293
variables:
  - FILE_PATH
-->
Cannot upload "${FILE_PATH}": its name or folder is one that credentials are kept under (such as .env, a .pem or .key file, or .ssh), so it is not uploaded on Claude's word alone. Tell the user it was not uploaded.
