<!--
name: 'Tool Parameter: Read bypass size limit'
description: >-
  Describes the parameter to override standard file size limits when reading
  large files that fit within context.
ccVersion: 2.1.310
-->
Set to true to read a text file, or a line range of one, that is over the usual size limits, up to what still fits in your context. Only use this when you genuinely need all of it or the user asked for the whole file; otherwise read it in parts with offset and limit, or search it.
