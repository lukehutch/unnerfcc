<!--
name: 'Tool Result: Connector tool did not finish (input requested)'
description: >-
  Informs the model that a connector tool requested additional input after
  receiving file contents and did not finish, advising against retrying.
ccVersion: 2.1.325
variables:
  - TOOL_NAME
-->
The tool "${TOOL_NAME}" did not finish. The connector got the call with its file contents, then asked for more input before running it, which can't be given here, so nothing more was sent. Don't assume anything was saved or delivered. Tell the user it did not finish and that their admin may need to check this connector. Don't repeat this call unless they ask, since that sends the contents again.
