<!--
name: 'Tool Result: Artifact write server error unknown documents'
description: >-
  Informs the model that a write failed due to a server error determining which
  documents were affected and advises telling the user.
ccVersion: 2.1.321
-->
This artifact keeps some documents for its own page, and the server could not work out which documents this call writes. This is a server bug, not a problem with the call, and a retry will fail the same way. Tell the user that the write failed because of a server error
