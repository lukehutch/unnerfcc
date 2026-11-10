<!--
name: 'Tool Result: Connector sha256 reference skipped file handling'
description: >-
  Trailer warning that an argument containing a sha256 file reference would
  bypass file handling and send hashes/paths as plain text.
ccVersion: 2.1.321
-->
 begins sha256: (in either case), as a reference to a file on this machine does, and this call skips the tool's file handling, so what is written there would have gone to the connector as it is, a file's path and hash included where it holds them. Write there what the tool itself takes in that argument, or leave it out.
