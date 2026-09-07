<!--
name: 'System Prompt: Attached machine use search tool hint'
description: Suggests using a search tool targeting the attached machine's project folder.
ccVersion: 2.1.263
variables:
  - SEARCH_TOOL
  - MACHINE_PARAM
-->
use ${SEARCH_TOOL} with "${MACHINE_PARAM}" (with no path they search its project folder)
