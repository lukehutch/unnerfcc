<!--
name: 'Tool Result: SendMessage held in permission-skipping session'
description: >-
  Warns that because this session skips permission prompts, the recipient may
  hold and drop the message unread after 5 minutes unless the user switches
  permission modes.
ccVersion: 2.1.329
variables:
  - RECIPIENT_SESSION
-->
; this session skips permission prompts, so ${RECIPIENT_SESSION} may hold the message for your user's approval and drop it unread after about 5 minutes — tell your user, who can switch this session to another permission mode and have you send it again
