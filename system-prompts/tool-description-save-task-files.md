<!--
name: 'Tool Description: save_task_files'
description: >-
  Describes the save_task_files tool used to save files produced by a background
  or cloud task to the user's computer.
ccVersion: 2.1.310
variables:
  - MAX_FILES_COUNT
-->
Save files that a task produced to this computer. Pass the task's task_id and, for up to ${MAX_FILES_COUNT} of its files, the file's id, the name it is saved as and its size in bytes, each exactly as a get_task answer for that task gave them earlier in this session: the saved-as name is the name the task gave the file, made safe as a file name, and the answer's note spells it out where the two differ or the name is long. Each file is saved in this session's task-files folder under that name, with a number added if the name is taken; nothing is overwritten. The person is asked to approve every call. The answer says where each file was saved, or why it was not.
