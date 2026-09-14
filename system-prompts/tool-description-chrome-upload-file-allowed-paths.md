<!--
name: 'Tool Description: Chrome upload file allowed paths'
description: >-
  Specifies which file paths can be uploaded to a page and warns that
  unauthorized paths are rejected.
ccVersion: 2.1.270
variables:
  - PREFIX
  - SUFFIX
-->
${PREFIX} Pass `paths` of files this session can read (attachments, the session's working, outputs, or uploads folders, or folders the user has connected); a path the client's file-read permissions or the host does not allow is rejected. ${SUFFIX}
