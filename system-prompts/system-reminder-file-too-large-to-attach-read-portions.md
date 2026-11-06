<!--
name: 'System Reminder: File too large to attach read in portions'
description: >-
  Advises reading an unattached large file in portions using offset and limit
  before answering.
ccVersion: 2.1.318
variables:
  - READ_TOOL_NAME
-->
). It was too large to attach, so you have not seen any of it. Read all of it before you answer, in portions with ${READ_TOOL_NAME}'s offset and limit, unless the request needs only a part of it, such as one fact that a search can find or a first look at what the file holds. A search shows only the lines that match its words, so it misses what is worded differently. 
