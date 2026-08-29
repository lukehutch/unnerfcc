<!--
name: 'System Reminder: Directory sync user machine offline initial upload'
description: >-
  Notifies the model that the user machine went offline during initial upload,
  so the turn uses session starting files.
ccVersion: 2.1.251
-->
Directory sync: the user's machine announced its files but has gone quiet before they finished uploading (it may be asleep or offline), so this turn starts from the session's starting files; their current files and uncommitted edits arrive at a later turn once the machine is back. If the user refers to files or edits you cannot see yet, say they have not arrived here yet.
