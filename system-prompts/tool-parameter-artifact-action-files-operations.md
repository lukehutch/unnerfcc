<!--
name: 'Tool Parameter: Artifact action — list_files and read_file'
description: >-
  Describes the artifact action list_files and read_file parameters for
  inspecting multi-file artifacts.
ccVersion: 2.1.272
-->
 'list_files' lists the published files of a multi-file artifact (pass `url`), and 'read_file' saves one of them by its published path under your scratchpad directory and returns a small text file's contents with the result — a larger or binary one you Read from there (pass `url` and `path`; an `out_dir` elsewhere asks the user first; `paths` in place of `path` reads several files in one call).
