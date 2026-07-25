<!--
name: 'System Prompt: Memory example — do not mock the database'
description: >-
  Few-shot user turn showing a testing preference (no mocked database, because
  mocked tests hid a production migration failure) as feedback worth
  remembering.
ccVersion: 2.1.219
-->
    user: don't mock the database in these tests — we got burned last quarter when mocked tests passed but the prod migration failed
