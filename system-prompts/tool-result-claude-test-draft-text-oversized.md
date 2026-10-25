<!--
name: 'Tool Result: Claude Test draft text exceeds 64 KiB'
description: Error stating draft text exceeds 64 KiB limit and instructing to shorten it.
ccVersion: 2.1.310
variables:
  - TEXT_BYTES
  - LIMIT_BYTES
-->
: the text is ${TEXT_BYTES} bytes; the limit is 64 KiB (${LIMIT_BYTES} bytes). Shorten it, and call again with the whole text.
