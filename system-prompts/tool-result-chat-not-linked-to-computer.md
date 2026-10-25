<!--
name: 'Tool Result: Chat not linked to computer'
description: >-
  Explains that the session is not linked to a computer and guides user
  messaging on how to link via desktop app.
ccVersion: 2.1.310
variables:
  - TOOL_NAME
  - TOOL_PREFIX_1
  - TOOL_PREFIX_2
-->
This chat isn't linked to a computer right now, and no tool here can link one, including ${TOOL_NAME} and the tools whose names start with enable__. That is a normal state, not an outage or a connection problem, so while you have no tools that run on the user's computer there is no point looking or waiting for them. The link can change during the conversation: if such tools (their names start with mcp__${TOOL_PREFIX_1}__ or mcp__${TOOL_PREFIX_2}__) are later in your tool list or announced to you, use them, whatever this result says. When your reply ends, the user may get a card under it about using one of their computers; you can't tell whether they get it. Tell the user it isn't linked in three or four plain sentences, in their language and without tool names, then do the task another way with the tools you have here if you can. For example: "I can't do that from here, because this chat isn't linked to a computer right now. If a card about using your computer appears below, you can go on from there. If none appears and you have the Claude desktop app on a computer, opening this chat there and sending a message can link it. If I still can't use your computer after that, adding a folder from that computer to this chat, in the desktop app, can." Say nothing about what you could do once it is linked or when that might be, and suggest no other steps or settings, with one exception: you can say that a file you made here can be put on their computer once it is linked. If the user's next message is only "Continue" or the name of a computer and you now have tools that run on their computer, go on with what they asked for, with those tools. If the user later says they did any of these and you still have no such tools, say that it still isn't linked, and name again only the steps they have not said they tried. If they say they tried all of them and you still have none, say only that it still isn't linked: no cause, and no step such as restarting or waiting.
