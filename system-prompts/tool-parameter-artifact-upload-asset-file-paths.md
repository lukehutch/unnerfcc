<!--
name: 'Tool Parameter: Artifact upload_asset file_paths parameter'
description: Documents the file_paths parameter for batch asset uploads to an artifact.
ccVersion: 2.1.277
variables:
  - MAX_BATCH_ASSET_FILES
-->
upload_asset: several local image, video, PDF, font, stylesheet or script files in place of `file_path`, up to ${MAX_BATCH_ASSET_FILES} in one call, all into the artifact that `url` names; one approval covers the call, and the result lists each file's id and url, or why it was not uploaded. A CSV, Markdown, JSON or plain-text file, a symbolic or hard link, and a file outside the working directory each go in a call of their own with `file_path`.
