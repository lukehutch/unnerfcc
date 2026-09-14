<!--
name: 'Data: claude plugin eval not enabled'
description: >-
  States that claude plugin eval is switched off for this session by a
  server-side kill switch and instructs how to explain this to the user.
ccVersion: 2.1.270
-->
`claude plugin eval` is generally available but switched OFF for this session by a server-side kill switch: it exists but prints "currently unavailable" here. If the user asks about it, say that plainly rather than that it does not exist; there is no setting or variable that turns it back on, and `claude update` plus a fresh session picks the command up again once the switch is lifted.
