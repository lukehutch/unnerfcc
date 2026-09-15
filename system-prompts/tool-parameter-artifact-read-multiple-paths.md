<!--
name: 'Tool Parameter: Artifact read multiple published paths'
description: >-
  Describes passing multiple published paths to read in a single call up to the
  specified limit.
ccVersion: 2.1.272
variables:
  - MAX_READ_PATHS
-->
read: several published paths in place of `path`, up to ${MAX_READ_PATHS} in one call. Each file is saved as a single `path` would be, and the result lists where each one landed, or why it could not be read, with small text files' contents included while they fit.
