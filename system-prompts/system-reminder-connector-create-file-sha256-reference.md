<!--
name: 'System Reminder: Use SHA-256 file reference for create_file'
description: >-
  Instructs the model to pass a sha256 file reference instead of raw base64 when
  uploading a local file with create_file.
ccVersion: 2.1.325
variables:
  - ACTION_PREFIX
-->
${ACTION_PREFIX} to upload a local file with create_file, don't type its base64, even if the tool's description or earlier calls in this conversation show base64. Set base64Content to a file reference, sha256:<the file's SHA-256, as 64 lowercase hex>:<its absolute path, with / between folders>. The app fills in the file's content when the call runs. If a reference is refused, do what the refusal says.
