<!--
name: 'Tool Result: File Reference Invalid Format'
description: >-
  Explains syntax requirements for sha256 file references and offers base64
  fallback.
ccVersion: 2.1.310
variables:
  - FIELD_NAME
-->
The file reference in ${FIELD_NAME} is not valid, so nothing was uploaded. Write it as sha256:<64 lowercase hex digits>:<absolute path>, with / between folders, also on Windows (C:/Users/...). No folder or file name in the path may be empty, be made only of dots and spaces (such as . or ..), or contain ':'. The path may not end in '/', contain backslashes, escapes like %20, or unusual characters, be over 1,024 bytes, or have more than 32 parts. Fix it, or put the file's base64 in ${FIELD_NAME}.
