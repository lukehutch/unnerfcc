<!--
name: 'Tool Result: Cannot Remove index.html from Artifact'
description: >-
  Explains that index.html cannot be removed with a null file entry and
  instructs publishing the new page as file_path.
ccVersion: 2.1.251
-->
"index.html" is the artifact's page itself and can't be removed, so drop that `null` entry from `files`. To change the page, publish the new page as `file_path` to the same `url`.
