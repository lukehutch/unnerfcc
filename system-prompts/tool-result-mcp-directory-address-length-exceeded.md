<!--
name: 'Tool Result: MCP directory address length exceeded'
description: >-
  Informs the model that a skill directory was not read because its address
  exceeded the maximum allowed byte length.
ccVersion: 2.1.310
variables:
  - MAX_BYTE_LENGTH
-->
 bytes: This directory was not read, because its address is longer than ${MAX_BYTE_LENGTH} bytes. While a skill from this server is loaded, this app reads a directory only at an address of ${MAX_BYTE_LENGTH} bytes or less.
