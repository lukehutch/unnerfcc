<!--
name: 'Tool Parameter: Artifact root requires files suffix'
description: >-
  Clarifies that the root parameter requires files except for data file paths on
  typed artifacts.
ccVersion: 2.1.310
-->
 It requires `files`, except on an Artifact made from a type, where a data `file_path` is served at its path relative to `root`, unless a `files` map entry states its served path. Claude sends it with every such publish, set to the folder that holds the Artifact's files at their served paths.
