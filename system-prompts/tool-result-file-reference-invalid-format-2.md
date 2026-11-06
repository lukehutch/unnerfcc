<!--
name: 'Tool Result: File reference invalid format'
description: >-
  Details the required sha256 path format specification for file reference
  attachments.
ccVersion: 2.1.318
variables:
  - FIELD_NAME
  - ATTACHMENT_INDEX
  - REASON
-->
The file reference in the ${FIELD_NAME} of the ${ATTACHMENT_INDEX} attachment is not valid, ${REASON} Write it as sha256:<64 lowercase hex digits>:<absolute path>, with / between folders, also on Windows (C:/Users/...). No folder or file name in the path may be empty, be made only of dots and spaces (such as . or ..), or contain ':'. The path may not end in '/', contain backslashes, escapes like %20, or unusual characters, be over 1,024 bytes, or have more than 32 parts. Fix it, or put the file's base64 in that attachment's ${FIELD_NAME}.
