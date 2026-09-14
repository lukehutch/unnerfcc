<!--
name: 'Tool Parameter: Artifact root requires files suffix'
description: >-
  Clarifies that the root parameter requires files except for data file paths on
  typed artifacts.
ccVersion: 2.1.270
-->
 It requires `files`, except on an Artifact made from a type, where a data `file_path` under it is served at its path relative to it.
