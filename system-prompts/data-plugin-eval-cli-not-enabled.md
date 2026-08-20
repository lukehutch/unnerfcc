<!--
name: 'Data: claude plugin eval not enabled'
description: >-
  Availability block stating `claude plugin eval` is gated off in this session,
  telling the model to say so plainly rather than that the command does not
  exist, to give the enablement facts from the reference, and never to guess an
  enablement variable name.
ccVersion: 2.1.235
-->
`claude plugin eval` is NOT enabled in this session (early access, enabled per organization): it exists but prints "currently in early access" here. If the user asks about it, say that plainly rather than that it does not exist, give the enablement facts from the Availability section of the plugin-eval reference in your prompt or skill files, and do not guess enablement variable names — a gated-off user obtains the variable from their Anthropic contact.
