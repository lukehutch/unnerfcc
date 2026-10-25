<!--
name: 'Tool Result: Grep search execution failed'
description: >-
  Informs the model that ripgrep failed unexpectedly, advising one retry and
  cautioning against manual recursive shell searches.
ccVersion: 2.1.310
-->
The search failed, so this is not a "no matches" result: matches may exist. What happened to the search program (ripgrep) is not known, and no results were read. Run the search once more. If it fails again, tell the user that searches are failing. Do not run a recursive search in the shell instead (for example grep -r, find or rg): it can reach what this tool is set to leave out.
