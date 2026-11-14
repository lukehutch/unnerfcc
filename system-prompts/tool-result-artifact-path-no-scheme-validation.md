<!--
name: 'Tool Result: Artifact file path cannot contain URL scheme'
description: >-
  Rejects paths containing :// and instructs providing a disk file path rather
  than a link.
ccVersion: 2.1.325
-->
a path cannot hold "://", even with invisible characters in between. Give the file's path on disk, not a link. If that path has a colon in it, write one slash after the colon.
