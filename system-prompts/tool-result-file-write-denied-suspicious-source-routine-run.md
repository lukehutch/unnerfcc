<!--
name: 'Tool Result: File write denied suspicious source in routine run'
description: >-
  Refuses writing from linked, oddly pathed, or unattached files in an
  unattended routine run without human approval.
ccVersion: 2.1.310
-->
Nothing was written. A source file is reached through a link, is hard-linked, has an unusually spelled path, or is in an uploads folder but is not one of the user's attachments. Only a person can approve a write from such a file, and no one is present in this routine run. Do not retry with the file. If this run made the documents itself, it can send them inline in data; otherwise say in your report what was not written and why.
