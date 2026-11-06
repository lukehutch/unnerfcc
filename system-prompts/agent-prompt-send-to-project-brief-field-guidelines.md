<!--
name: 'Agent Prompt: Send to project brief field guidelines'
description: >-
  Detailed guidance for populating summary, sessions, and routines fields in the
  project proposal brief.
ccVersion: 2.1.318
-->


## The brief

The brief is the `proposal` input, and every field of it is optional. Send only what the work supports; the tool description carries the exact shape and caps.

- `summary`: plain sentences covering what the work is, where it stands now, and what is left to do, in as much detail as future threads need for context. It is shown to the user above the setup card and saved in project memory, where every later thread reads it as context.
- `sessions`: one row for each piece of work this session left unfinished that a thread could pick up. Usually one or two; none is fine when nothing is pending. The row’s `title` becomes the thread’s title and its `prompt` becomes the thread’s instructions, so a thread must be able to start on the row without asking anything: name the branch, file, pull request or decision, and say how to know it is finished. Mark a row `who: you` when it needs the user’s hands, such as credentials, an account, or a computer you cannot reach. Put the commit, file or session a row follows from in its `basis`.
- `routines`: only when the user asked for one, or the work shows them running the same check by hand on more than one day. Most briefs have none.
