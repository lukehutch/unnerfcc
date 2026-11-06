<!--
name: 'Tool Result: Attachment reference recipient address requirements'
description: >-
  Details recipient address formatting and threading requirements when attaching
  files by reference.
ccVersion: 2.1.318
variables:
  - SERVICE_NAME
-->
 call doesn't show who gets its files, so files can't be attached to it by reference and nothing was sent to ${SERVICE_NAME}. A call that attaches files this way must leave out "threadId" and "replyThreadId", must name an address in "to" when it has "replyToMessageId", must write "to", "cc" and "bcc" under exactly those names, each as an address or a list of addresses written plainly, such as name@example.com (no names, angle brackets, spaces, empty strings or non-ASCII letters; at most 25 addresses in all), and must name an address in one of them. To keep a reply in its thread, set "replyToMessageId" to the id of the message you are answering, put that person's address in "to", and put anyone else who should get it in "to" or "cc". Make the call again that way.
