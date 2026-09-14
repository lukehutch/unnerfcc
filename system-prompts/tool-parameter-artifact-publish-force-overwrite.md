<!--
name: 'Tool Parameter: Artifact publish force overwrite'
description: >-
  Describes the force overwrite flag for publish, warning that it discards newer
  published versions.
ccVersion: 2.1.270
-->
publish: a last-resort overwrite that **discards** the newer published version. On a conflict, Claude merges its changes onto the newer content that the rejection hands it and publishes again. Claude passes true only when the person explicitly said to discard that specific version, and the server may still refuse it over a version saved from inside the page.
