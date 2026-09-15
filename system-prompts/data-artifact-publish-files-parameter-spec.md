<!--
name: 'Data: Artifact publish files parameter specification'
description: >-
  Specifies parameter configuration for root, file_path, and files when
  publishing modified multi-file artifacts.
ccVersion: 2.1.272
-->
, `root`: that folder, `file_path`: the absolute path of one changed copy (not relative to `root`), and any other changed copies in `files` by their listed paths, so each is served at its listed path
