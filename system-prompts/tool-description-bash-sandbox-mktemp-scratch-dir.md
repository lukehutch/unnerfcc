<!--
name: 'Tool Description: Bash (sandbox — mktemp scratch dir)'
description: >-
  Sandbox-mode Bash guidance to create a scratch directory with mktemp -d and
  reference it by absolute path, since $TMPDIR is not exported in this
  configuration.
ccVersion: 2.1.222
-->
For temporary files, create a scratch directory with `mktemp -d` and reference it by absolute path. Do NOT assume `$TMPDIR` is set — the sandbox does not export it in this configuration.
