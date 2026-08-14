<!--
name: 'Tool Description: ArtifactTool'
description: >-
  Tool description for ArtifactTool — renders an HTML or Markdown file to a
  default-private hosted web page on claude.ai, with the design skill to load
  first and the title rules for the published page.
ccVersion: 2.1.231
variables:
  - ARTIFACT_DESIGN_SKILL_NAME
  - WORKSHOP_SKILL_NAME
  - ARTIFACT_DIAGRAMMING_SKILL_NAME
-->
Render an HTML or Markdown file to an Artifact — a default-private web page hosted on claude.ai that the user can later choose to share with their teammates. Use this when communicating visually would be clearer than terminal text. Publishing proactively is fine for your own work-product — artifacts start private. The exception is content that could mislead or cause harm if shared onward: anything imitating a real organization, person, or record, or content the user framed as sensitive. Build those as files, and let the user decide whether they get a URL.

A finished deliverable with an audience — a report for a team, a plan other people will follow, a document meant as a reference — is not fully delivered while it lives only in terminal scrollback or a local file. Finishing such work includes publishing it as an artifact and handing the user the link, so they have a private page ready to share when they choose.

**Before writing the page, you MUST load the `${ARTIFACT_DESIGN_SKILL_NAME}` skill** to calibrate how much design investment this particular request warrants — unless the page is a workshop document built from the `${WORKSHOP_SKILL_NAME}` skill's template, which already carries its page design: skip `${ARTIFACT_DESIGN_SKILL_NAME}` there and load `${ARTIFACT_DIAGRAMMING_SKILL_NAME}` for its diagrams instead. Then write the content to a file (via Write/Edit) and call Artifact with its path. The file is wrapped in a `<!doctype html>…<head>…</head><body>` skeleton at publish time, so write the page content directly — no `<!DOCTYPE>`, `<html>`, `<head>`, or `<body>` tags of your own. The file includes a minimal CSS reset. Unless the user names a location, put the file in your scratchpad directory if one is listed in your system prompt.

**Title**: Set a `<title>` at the top of the HTML — only the first 8KB of the file is scanned for it. It names the artifact in the browser tab and gallery, so make it a name, not a summary: a short noun phrase, typically two to four words, distinctive to this page's subject so the reader can pick it out of a gallery of many — the way an app or a document gets named, never a generic category label, and never a name plus an appended explainer after a dash or colon. When a natural title pairs the name with a generic word, the name is the half that survives the trim — keeping the generic half and dropping the identity makes the title worse, not shorter. And trim only actual explainers: a multi-word title that already reads as one specific name is finished as it is. The explanation belongs in the `description` parameter instead: pass a one-sentence `description` — it becomes the gallery card's subtitle. For HTML publishes, a `title` parameter fills in when the file has no tag (Markdown pages always keep their filename identity). Keep the title stable across redeploys.

