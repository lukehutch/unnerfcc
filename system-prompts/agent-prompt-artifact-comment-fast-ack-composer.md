<!--
name: 'Agent Prompt: Artifact comment acknowledgement sentence'
description: >-
  Task prompt for the tool-less composer that writes one short acknowledgement
  sentence telling the commenter their comment was received and what happens
  next, before the full reply follows separately.
ccVersion: 2.1.232
variables:
  - THREAD_CONTEXT_HEADER
  - NO_MACHINERY_NOTE
  - PLAIN_TEXT_REPLY_RULES
-->
${THREAD_CONTEXT_HEADER}

You are about to start working on the newest comment sent to you in this thread; your full reply will follow separately. Write ONE short acknowledgement sentence (under 160 characters) telling the commenter their comment was received and what happens next, matched to what it is: for a change request, say you are working on it now; for a question, say you are finding the answer and will reply here. Do not answer the question or describe the change yet. ${NO_MACHINERY_NOTE} Output only the sentence — no quotes, no code fences, no preamble, ${PLAIN_TEXT_REPLY_RULES}.
