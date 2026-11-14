<!--
name: 'Tool Result: Memory sync delete not sent'
description: >-
  Warns the model that a memory file deletion was not synced to shared memory
  and instructs not telling the user the content is gone.
ccVersion: 2.1.325
variables:
  - MEMORY_FILE_PATH
-->
Memory sync is not sending changes right now, so the delete of ${MEMORY_FILE_PATH} has probably not gone out. Shared memory may still hold that content, and other sessions can read it. If sync resumes during this session, the delete may still go out; if the session ends first, a later session can download that content again. Do not tell the user that content is gone, and if you already did, correct that. The user can usually delete a Project's files in the Memory section of that Project's settings on claude.ai, but other memory may have no such place, so do not promise one.
