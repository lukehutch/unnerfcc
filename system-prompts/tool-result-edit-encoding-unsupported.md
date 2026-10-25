<!--
name: 'Tool Result: File encoding unsupported by edit tools'
description: >-
  Explains that Edit and Write tools only write UTF-8 or UTF-16LE and suggests
  shell commands or encoding conversion.
ccVersion: 2.1.310
-->
. These tools write UTF-8 (or UTF-16LE behind its byte-order mark) and never convert a file's encoding on their own, so nothing was written. If the file is text, make the change with a shell command that reads and writes it in its own encoding (iconv, or PowerShell Get-Content/Set-Content -Encoding), or ask the user whether to convert it to UTF-8 first. To replace the whole file with new UTF-8 text anyway, delete it first, then Write it.
