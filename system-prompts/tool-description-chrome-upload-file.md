<!--
name: 'Tool Description: Chrome upload file'
description: >-
  Describes uploading files to a page's file input by ref instead of clicking,
  and which paths and sizes are allowed.
ccVersion: 2.1.219
-->
Upload one or multiple files to a file input element on the page. Do not click on file upload buttons or file inputs — clicking opens a native file picker dialog that you cannot see or interact with. Instead, use read_page or find to locate the file input element, then use this tool with its ref to upload files directly. Only files the user has shared with this session (attachments, the session's outputs/uploads folders, or folders the user has connected) can be uploaded; other paths will be rejected. The combined size of all files in a single call must stay under 10 MB.
