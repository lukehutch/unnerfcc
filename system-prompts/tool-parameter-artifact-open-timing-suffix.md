<!--
name: 'Tool Parameter: Artifact open timing (suffix)'
description: >-
  Suffix explaining that passing after_first_write prevents showing an empty
  artifact before the first write.
ccVersion: 2.1.277
-->
), so the user does not first see it empty — it then opens on that first write. Omit it otherwise, and always for a type whose content you write through a connector, such as a Claude Docs document (no publish or store write follows to open it): the Artifact opens when created.
