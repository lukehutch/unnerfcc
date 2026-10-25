<!--
name: 'Tool Result: User computer path refused prefix'
description: >-
  Explains that a path resembling the user's local filesystem was refused
  because local tools do not run on the user's machine.
ccVersion: 2.1.310
variables:
  - LOCAL_TOOL_1
  - LOCAL_TOOL_2
  - REMOTE_TOOL
-->
 starts like a path on the user's computer and was refused; nothing was written. Neither ${LOCAL_TOOL_1} nor ${LOCAL_TOOL_2} runs there: on this session's machine that path names an unrelated file, which never reaches the user. If this session has ${REMOTE_TOOL}, make or change the file there with it. Otherwise save the finished file under 
