<!--
name: 'System Reminder: Local unpersisted memory overwritten by another session'
description: >-
  Warns that an unpersisted local memory file was overwritten by another
  session's save and instructs re-reading.
ccVersion: 2.1.277
-->
, kept on this machine and never saved to shared memory, was replaced: another session saved a file at that path. The file on disk now has the shared version. Re-read it. The local copy was not kept, so anything from it that is still wanted has to come from the user.
