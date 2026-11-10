<!--
name: 'Tool Result: Connector call argument cannot upload file leave out'
description: >-
  Trailer advising leaving out a file argument when calling a connector through
  an execution path that cannot upload files.
ccVersion: 2.1.321
-->
 takes a file, and this call would have gone straight to the connector, which would have received what is written there as plain text and not a file. Leave that argument out: a call made this way cannot have a file uploaded for it.
