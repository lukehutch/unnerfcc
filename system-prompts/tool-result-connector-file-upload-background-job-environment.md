<!--
name: 'Tool Result: Connector file upload blocked in background job environment'
description: >-
  Explains that background job flags or inherited tmux/shell variables
  invalidate terminal approval prompts for connector file uploads.
ccVersion: 2.1.321
-->
sending a file to a connector needs the user to allow it when Claude Code asks at its own prompt in a terminal, and this session's environment marks it as a background job or as started inside one (for example, with claude --bg), where another program may answer that prompt, so an Allow given there does not count. To send a file, the user would at least have to start Claude Code in a terminal whose environment does not carry a background job's marks. A terminal can carry them without being inside a job: for example, a window of a tmux server started inside such a job, or a shell whose own start-up files set them
