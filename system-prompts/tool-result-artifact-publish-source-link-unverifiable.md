<!--
name: 'Tool Result: Artifact Publish Source Link Unverifiable'
description: >-
  Explains that non-plain files or links approved elsewhere cannot be verified
  and advises publishing at the resolved path.
ccVersion: 2.1.270
-->
file_path: the source is a symlink, a hard link, or not a plain file, and its approval came from another process, so it cannot be verified here and nothing was published. Retrying this path will likely fail again: publish the file at its resolved path (for a hard link, a plain copy), or tell the user.
