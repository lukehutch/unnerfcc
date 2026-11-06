<!--
name: 'Tool Description: save_task_files parameter rules'
description: Specifies task_id and file parameters for calling save_task_files.
ccVersion: 2.1.318
variables:
  - MAX_FILES_COUNT
-->
Pass the task's task_id and, for up to ${MAX_FILES_COUNT} of its files, the file's id, the name it is saved as and its size in bytes, each exactly as a get_task answer for that task gave them earlier in this session: the saved-as name is the name the task gave the file, made safe as a file name, and the answer's note spells it out where the two differ or the name is long.
