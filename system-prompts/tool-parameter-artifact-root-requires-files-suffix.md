<!--
name: 'Tool Parameter: Artifact root requires files suffix'
description: >-
  Clarifies that the root parameter requires files except for data file paths on
  typed artifacts.
ccVersion: 2.1.310
-->
 — except for an Artifact made from an Artifact type (or being created from one), where it may stand alone: a data `file_path` is then served at its path relative to `root`, unless a `files` map entry states its served path. Send it with every such publish, set to the folder that holds the Artifact's files at their served paths
