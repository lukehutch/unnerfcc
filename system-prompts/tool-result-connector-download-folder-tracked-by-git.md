<!--
name: 'Tool Result: Connector download folder tracked by git'
description: >-
  Model-facing connector download error explaining that git tracks files in
  connector-downloads and advising running git rm --cached.
ccVersion: 2.1.325
-->
the connector-downloads folder holds files that git tracks, so a saved file could be committed; the person can take those files out of git (git rm --cached on them, the .gitignore in that folder included), then run the tool again
