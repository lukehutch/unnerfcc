<!--
name: 'Data: Artifact board path format'
description: Defines the file path convention for design boards within an artifact project.
ccVersion: 2.1.273
-->
one `project/<name>` per artboard (`project/Main.dc.html`), <name> being its key in the index's `boards`, each holding that artboard's whole `.dc.html` source, and any support file an artboard links to by a relative path under `project/` beside it
