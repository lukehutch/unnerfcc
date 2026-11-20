<!--
name: 'System Prompt: File references for SharePoint'
description: >-
  Model-facing instruction to use sha256 file references instead of raw base64
  in sharepoint_upload_file and sharepoint_update_file.
ccVersion: 2.1.329
variables:
  - FILE_REFERENCES_PREFIX
-->
${FILE_REFERENCES_PREFIX} to save a local file with sharepoint_upload_file or sharepoint_update_file, don't type its base64, even if the tool's description or earlier calls in this conversation show base64. Set contentBase64 to a file reference, sha256:<the file's SHA-256, as 64 lowercase hex>:<its absolute path, with / between folders>. The app fills in the file's content when the call runs. If a reference is refused, do what the refusal says.
