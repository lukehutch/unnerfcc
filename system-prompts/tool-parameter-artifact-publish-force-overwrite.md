<!--
name: 'Tool Parameter: Artifact publish force overwrite'
description: >-
  Describes the force overwrite flag for publish, warning that it discards newer
  published versions.
ccVersion: 2.1.257
-->
publish: last-resort overwrite that DISCARDS the newer published version (another session's publish, or someone's save from the page). On a conflict the fix is to merge your changes onto the newer content (handed to you in the rejection, or re-read) and publish again — not force. Pass true only when the user explicitly said to discard that specific version; the server may still refuse it over a version saved from inside the page.
