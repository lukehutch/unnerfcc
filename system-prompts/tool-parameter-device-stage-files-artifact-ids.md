<!--
name: 'Tool Parameter: Device stage files artifact_ids'
description: >-
  Describes the artifact_ids parameter for staging Cowork artifacts' HTML into
  the container and how unsupported desktops omit them.
ccVersion: 2.1.325
-->
Ids of Cowork artifacts on this device (from list_artifacts) whose current HTML to stage into the container at /mnt/user-data/uploads/cowork-artifacts/<id>/index.html. Use this to read an artifact's existing content before update_artifact. Result entries for artifacts carry artifactId instead of devicePath. On desktops that don't support artifact staging the response omits artifact entries entirely — treat a missing entry as unsupported, not as an empty artifact.
