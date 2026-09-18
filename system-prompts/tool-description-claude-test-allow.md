<!--
name: 'Tool Description: claude_test_allow'
description: >-
  Prompts the user for permission to allow the Claude Test browser to open an
  address requiring consent.
ccVersion: 2.1.277
-->
Ask the person whether the Claude Test browser may open ONE address this project is waiting for ("ct.mjs status" lists them under needsConsent, with the exact arguments for this tool). Claude Code shows the person a dialog that opens with that address, goes on to the project folder and ends in a box to tick; only Accept with the box ticked records it, for that project on this machine. Call it from the person's own conversation with needsConsent.tool.arguments as status printed them; status names the next address waiting after each yes. After a no it does not ask about that address again in this session, and after eight questions that ended without a yes it asks no more in this session. A background run never calls it.
