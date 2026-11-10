<!--
name: 'Tool Result: Connector send file directory requirements'
description: >-
  Comprehensive error explaining allowed directories, symlink checks, internal
  config restrictions, and clipboard picture handling for connectors.
ccVersion: 2.1.321
variables:
  - FILE_TYPE
  - FILE_PATH
  - ATTACHMENTS_DIR_HINT
  - PERMISSION_HINT
  - EXTRA_NOTE
-->
Cannot send ${FILE_TYPE} ${FILE_PATH}: a file can be sent to a connector only if it exists, this session may read it, it is not one of the files Claude Code keeps for itself (its configuration folder, with its settings, its saved sessions and its sign-in), and it is in the folder Claude Code started in, in a folder added for this session, or in the folders a hosted session keeps for attachments and outputs. If the path is or goes through a link, the file it leads to must be in one of these folders. To send a file from another folder, tell the user to type /add-dir and that folder's path and to choose "Yes, for this session" (or to start Claude Code with --add-dir and that path), then to ask again. A folder added with "Yes, and remember this directory" or listed in a settings file does not count: if /add-dir answers that the folder is "already added" or "already accessible", a session that the user starts in that folder counts it as the folder Claude Code started in. A picture pasted from the clipboard is not a file: the path Claude Code gives for it is Claude Code's own temporary copy, which cannot be sent. Tell the user to save the picture as a file in the folder Claude Code started in, then to drag that file in and ask again.${ATTACHMENTS_DIR_HINT}${PERMISSION_HINT} ${EXTRA_NOTE}
