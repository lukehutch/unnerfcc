<!--
name: 'Tool Result: File upload browser bridge size limit'
description: >-
  Explains that file_upload transfers contents in a single message over the
  browser bridge, advising smaller files or multiple calls.
ccVersion: 2.1.310
-->
. file_upload sends file contents over the browser bridge in a single message; use a smaller file, or split across multiple file_upload calls if the page accepts files one at a time.
