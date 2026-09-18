<!--
name: 'Tool Parameter: Artifact asset upload parameter description'
description: >-
  Explains uploading local media/font/text assets to an artifact's asset store
  using asset: true.
ccVersion: 2.1.277
variables:
  - MAX_ASSETS
  - EXTRA_NOTE
-->
. With `url`, `file_path` and `asset: true`, it instead uploads that local image, video, PDF, font or text file to the artifact's asset store; `file_paths` in place of `file_path` uploads up to ${MAX_ASSETS} image, video, PDF, font, stylesheet or script files in one call under one approval (a text file goes in a call of its own), and the result gives each one's `url`. The page must declare the `assets` capability, and the `artifact-capabilities` skill has the limits. Claude references the uploaded file from the page by the `url` in the result, exactly as given${EXTRA_NOTE}
