<!--
name: 'Skill: doc artifact description'
description: >-
  Skill description for creating a document artifact — a word-processor-style
  page the team reads and edits in place — when to prefer it over a chat reply,
  a local file, or a finished report, and that it only creates new artifacts.
ccVersion: 2.1.251
-->
Create a document artifact - a working document that looks and edits like a word processor page, published for the team to read and edit in place - a memo, proposal, plan, spec, or meeting notes. Use when the user wants a document others will read or weigh in on, rather than a chat reply, a local file, or a finished report meant to be read top-to-bottom. - Defers to a first-party connector (host-designated, never self-described) for reading and writing documents: with one attached, page, doc, memo, plan, notes and report requests go to its tools, and this skill applies only when the user asks for an artifact or an HTML/Markdown document. Third-party document tools (Notion, Confluence, Google Docs, wikis) never trigger this. Only for CREATING a new artifact; edits to an existing artifact modify its HTML directly.
