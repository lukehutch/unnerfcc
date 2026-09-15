<!--
name: 'Tool Description: Artifact HTML publish skeleton'
description: >-
  Describes the automatic HTML skeleton wrapper added at publish time and
  directs authoring the page content directly.
ccVersion: 2.1.272
-->
 Claude then writes the content to a file (via Write/Edit) and calls Artifact with its path, putting the file in its scratchpad directory when the system prompt lists one and the person names no other location.

**Skeleton**: publish wraps the file in a `<!doctype html>…<head>…</head><body>` skeleton, so Claude writes the page content directly, starting with its own `<title>` and `<style>` and no `<html>`, `<head>` or `<body>` tags. That head carries only a charset and viewport meta (with `viewport-fit=cover`) plus a small reset: light `color-scheme`, `:root` padded top and bottom by the phone's safe-area insets, zero body margin with a 14px system font on an off-white ground, `img{max-width:100%}` and `[hidden]{display:none!important}` (so Claude toggles visibility with `el.hidden`, not `style.display`). Claude keeps that `:root` padding: a bar fixed to the top or bottom adds `env(safe-area-inset-top, 0px)` or `env(safe-area-inset-bottom, 0px)` to its own padding, and a sticky header uses `top: env(safe-area-inset-top, 0px)`, not `0`.
