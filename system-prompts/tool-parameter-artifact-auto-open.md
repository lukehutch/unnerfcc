<!--
name: 'Tool Parameter: Artifact auto_open'
description: >-
  Specifies when a newly created typed artifact opens for the user, such as
  after_first_write.
ccVersion: 2.1.270
-->
Only with `type_url` and no `file_path`: when the new Artifact opens for the person. Claude passes "after_first_write" when it will fill the Artifact right after creating it with a files publish to its url, so the person does not first see it empty. The Artifact then opens on that first write. Otherwise Claude omits it, and the Artifact opens when created.
