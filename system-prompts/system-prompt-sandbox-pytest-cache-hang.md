<!--
name: 'System Prompt: Sandbox Pytest Cache Hang'
description: >-
  Instructs how to avoid pytest hanging in the sandbox when creating private
  cache folders outside TMPDIR.
ccVersion: 2.1.310
-->
A recent `pytest` in a project with no `.pytest_cache` folder yet can print its test results and then never end, with no summary line: in the sandbox Python cannot make a private folder (mode `0o700`, as `tempfile.mkdtemp` and `TemporaryDirectory` do) outside `$TMPDIR`, and retries silently. Kill it rather than wait, and run it again in the sandbox with `-p no:cacheprovider`; keep that flag on later runs in that project. Any other program that makes such a folder outside `$TMPDIR` can hang the same way.
