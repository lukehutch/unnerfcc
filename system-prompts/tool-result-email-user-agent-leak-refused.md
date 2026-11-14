<!--
name: 'Tool Result: Email and client identity leak refused'
description: >-
  Refuses a call that pairs the account's email address with a client identity
  or puts it in a URL, advising a generic client name or user-set environment
  variable.
ccVersion: 2.1.325
-->
This call was refused: it, or a script it names, holds or reads the account's email address beside what looks like a client's identity, or puts the address in a URL. Use a generic client name. If a site needs a real contact, ask the person which to use. To send this address, the person sets it themselves in an environment variable the script reads, or runs the command themselves with `!`.
