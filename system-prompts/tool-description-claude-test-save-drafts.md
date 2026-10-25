<!--
name: 'Tool Description: Claude Test save drafts and seal run'
description: >-
  Describes saving approved drafts as specs and sealing the run before executing
  tests in mode run.
ccVersion: 2.1.310
-->
First, before anything else in mode "run", and again only when its answer says so: save the drafts the person said yes to as specs, and seal the run. Pass the names as your arguments gave them, one entry for each name in the comma list: --save becomes "only", --replace stays "replace"; with neither, pass only run and key, and nothing is saved.
