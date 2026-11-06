<!--
name: 'Tool Description: save_task_files (container)'
description: >-
  Describes saving task files into the chat container where shell commands and
  file tools execute.
ccVersion: 2.1.318
variables:
  - PARAMETER_INSTRUCTIONS
-->
Save files that a task produced into this chat's container, where this session's shell commands and file tools work. ${PARAMETER_INSTRUCTIONS} Each file is saved in this chat's task-files folder in the container under that name, with a number added if the name is taken; nothing is overwritten. A saved file stays while the chat's container keeps its disk, so a later turn may find it gone. The person is asked to approve every call. The answer says where each file was saved, or why it was not.
