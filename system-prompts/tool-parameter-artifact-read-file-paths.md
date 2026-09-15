<!--
name: 'Tool Parameter: Artifact read_file paths parameter'
description: >-
  Describes the paths parameter for reading multiple published artifact files in
  a single call.
ccVersion: 2.1.272
variables:
  - MAX_PATHS
-->
read_file: several published paths in place of `path`, up to ${MAX_PATHS} in one call; each file is saved as a single `path` would be, and the result lists where each one landed, or why it could not be read, with small text files' contents included while they fit.
