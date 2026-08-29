<!--
name: 'Tool Parameter: app_type allow_replace'
description: >-
  allow_replace parameter description for fallback replacement typing in
  background apps.
ccVersion: 2.1.251
-->
Only relevant when positional insert (set AXSelectedText) doesn't work for this app and the field already has content — in that case the only background fallback is replacing the WHOLE field. By default that is REFUSED (unsupported: would_replace_content) so you don't clobber a draft or document. Set true to proceed; the previous content (≤500 chars) is returned in the result so you can restore it if the replace was wrong.
