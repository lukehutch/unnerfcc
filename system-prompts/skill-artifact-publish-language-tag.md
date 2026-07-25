<!--
name: 'Skill: Artifact page language tag'
description: >-
  Tells the artifact-publishing skill to pass a BCP-47 `lang` on every publish
  so the page's <html lang> matches the content's language.
ccVersion: 2.1.219
-->
**Language**: Pass `lang` on every publish — the BCP-47 tag of the page's text content (`"ja"`, `"pt-BR"`). It becomes the page's `<html lang>`, which screen readers, hyphenation, and search rely on. Match the content's language, not the conversation's; for mixed-language pages use the dominant one.

