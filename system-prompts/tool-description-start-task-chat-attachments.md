<!--
name: 'Tool Description: Start task chat attachments guidance'
description: >-
  Explains how to attach user chat files to a task using their full path rather
  than copying text.
ccVersion: 2.1.293
variables:
  - ATTACHMENTS_DIR
-->
In this session, files the user attached to the chat are usually in ${ATTACHMENTS_DIR}. To give one to the task, put its full path in files as an object, such as files: [{"path": "${ATTACHMENTS_DIR}/report.csv"}]. Do that rather than copying the file's text into task_description.
